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
import { Plus, Pencil, Trash2, Loader2, Package, Lock, ShieldCheck, Settings } from 'lucide-react';
import ProductFormModal from '@/components/admin/ProductFormModal';
import { Link } from 'react-router-dom';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const { t, language, dir } = useLanguage();
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const { data: products, isLoading } = useProducts();
  const deleteProduct = useDeleteProduct();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

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
      case 'men': return t('men');
      case 'women': return t('women');
      case 'children': return t('children');
      default: return category;
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

  if (authLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-gold mx-auto" />
            <p className="text-muted-foreground">جاري التحميل...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user || !isAdmin) {
    return (
      <Layout>
        <div className="container py-20" dir={dir}>
          <Card className="max-w-md mx-auto text-center border-destructive/20 bg-destructive/5 rounded-3xl overflow-hidden">
            <CardContent className="pt-16 pb-12 px-8">
              <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-destructive/10 flex items-center justify-center">
                <Lock className="w-12 h-12 text-destructive" />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                الوصول محظور
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                عذراً، ليس لديك صلاحية للوصول إلى لوحة الإدارة.
                <br />
                يرجى تسجيل الدخول بحساب الأدمن.
              </p>
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="px-8 h-12 rounded-xl font-medium"
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl gradient-gold flex items-center justify-center shadow-luxury">
              <ShieldCheck className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                {t('admin')}
              </h1>
              <p className="text-muted-foreground">إدارة المنتجات والإعدادات</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              asChild
              variant="outline"
              className="h-12 px-5 rounded-xl font-medium"
            >
              <Link to="/settings" className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                الإعدادات
              </Link>
            </Button>
            <Button
              onClick={() => setIsFormOpen(true)}
              className="bg-gold hover:bg-gold-dark text-primary-foreground font-semibold px-6 h-12 rounded-xl shadow-luxury transition-all duration-300 hover:shadow-xl"
            >
              <Plus className="w-5 h-5 mr-2" />
              {t('addProduct')}
            </Button>
          </div>
        </div>

        {/* Products Table */}
        <Card className="border-border/50 shadow-premium rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-border/50 bg-secondary/30">
            <CardTitle className="flex items-center gap-3 text-lg font-semibold">
              <Package className="w-5 h-5 text-gold" />
              المنتجات ({products?.length || 0})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-gold" />
              </div>
            ) : !products || products.length === 0 ? (
              <div className="text-center py-20">
                <Package className="w-16 h-16 mx-auto mb-6 text-muted-foreground/30" />
                <p className="text-muted-foreground text-lg">{t('noProducts')}</p>
                <p className="text-muted-foreground/70 text-sm mt-2">ابدأ بإضافة منتج جديد</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50 hover:bg-transparent">
                      <TableHead className="w-24">الصورة</TableHead>
                      <TableHead>{t('productName')}</TableHead>
                      <TableHead>{t('productCategory')}</TableHead>
                      <TableHead>{t('price')}</TableHead>
                      <TableHead className="text-right w-32">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id} className="border-border/50 hover:bg-secondary/30">
                        <TableCell>
                          <img
                            src={product.images?.[0] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop'}
                            alt={getProductName(product)}
                            className="w-16 h-16 object-cover rounded-xl"
                          />
                        </TableCell>
                        <TableCell className="font-medium text-foreground">
                          {getProductName(product)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="font-normal rounded-lg px-3 py-1">
                            {getCategoryLabel(product.category)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="font-bold text-gold text-lg">
                            {product.price.toLocaleString()} DA
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(product)}
                              className="h-10 w-10 rounded-xl hover:bg-secondary"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-10 w-10 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive"
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
          <AlertDialogContent className="border-border/50 rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="font-display text-xl">{t('deleteProduct')}</AlertDialogTitle>
              <AlertDialogDescription className="text-muted-foreground">
                {t('confirmDelete')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-xl">{t('cancel')}</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl"
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
