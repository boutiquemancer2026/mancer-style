import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useProducts, useDeleteProduct, Product } from '@/hooks/useProducts';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Plus, Pencil, Trash2, Loader2, Package, ShieldAlert, Lock } from 'lucide-react';
import ProductFormModal from '@/components/admin/ProductFormModal';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const { t, language, dir } = useLanguage();
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const { data: products, isLoading } = useProducts();
  const deleteProduct = useDeleteProduct();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const getProductName = (product: Product) => {
    const names: Record<Language, string> = {
      ar: product.name_ar,
      fr: product.name_fr,
      en: product.name_en,
      ber: product.name_ber,
    };
    return names[language] || product.name_ar || product.name_en;
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'men':
        return t('men');
      case 'women':
        return t('women');
      case 'children':
        return t('children');
      default:
        return category;
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    if (deleteConfirmId) {
      await deleteProduct.mutateAsync(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  // Show loading state
  if (authLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  // Show access denied if user is not admin
  if (!isAdmin) {
    return (
      <Layout>
        <div className="container py-20" dir={dir}>
          <Card className="max-w-md mx-auto text-center border-destructive/30 bg-destructive/5">
            <CardContent className="pt-12 pb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
                <Lock className="w-10 h-10 text-destructive" />
              </div>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-3">
                الوصول محظور
              </h2>
              <p className="text-muted-foreground mb-6">
                عذراً، ليس لديك صلاحية للوصول إلى لوحة الإدارة.
                <br />
                يرجى التواصل مع المسؤول إذا كنت تعتقد أن هذا خطأ.
              </p>
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="px-6"
              >
                العودة للرئيسية
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8" dir={dir}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-medium text-foreground">
              {t('admin')}
            </h1>
            <p className="text-muted-foreground mt-1">إدارة المنتجات والإعدادات</p>
          </div>
          <Button
            onClick={() => setIsFormOpen(true)}
            className="bg-foreground text-background hover:bg-foreground/90 font-medium px-6 h-12 rounded-full"
          >
            <Plus className="w-5 h-5 mr-2" />
            {t('addProduct')}
          </Button>
        </div>

        {/* Products Table */}
        <Card className="border-border/50 shadow-premium">
          <CardHeader className="border-b border-border/50">
            <CardTitle className="flex items-center gap-2 text-lg font-medium">
              <Package className="w-5 h-5 text-gold" />
              المنتجات ({products?.length || 0})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
              </div>
            ) : !products || products.length === 0 ? (
              <div className="text-center py-20">
                <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground">{t('noProducts')}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50 hover:bg-transparent">
                      <TableHead className="w-20">الصورة</TableHead>
                      <TableHead>{t('productName')}</TableHead>
                      <TableHead>{t('productCategory')}</TableHead>
                      <TableHead>{t('price')}</TableHead>
                      <TableHead className="text-right w-28">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id} className="border-border/50">
                        <TableCell>
                          <img
                            src={product.images?.[0] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop'}
                            alt={getProductName(product)}
                            className="w-14 h-14 object-cover rounded-lg"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {getProductName(product)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="font-normal">
                            {getCategoryLabel(product.category)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold text-gold">
                            {product.price.toLocaleString()} DA
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(product)}
                              className="h-9 w-9 rounded-full"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                              onClick={() => setDeleteConfirmId(product.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Product Form Modal */}
        <ProductFormModal
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          product={editingProduct}
        />

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
          <AlertDialogContent className="border-border/50">
            <AlertDialogHeader>
              <AlertDialogTitle className="font-display">{t('deleteProduct')}</AlertDialogTitle>
              <AlertDialogDescription>
                {t('confirmDelete')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-full">{t('cancel')}</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full"
              >
                {deleteProduct.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  t('deleteProduct')
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default Admin;
