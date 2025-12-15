import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useProducts, useDeleteProduct, Product } from '@/hooks/useProducts';
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
import { Plus, Pencil, Trash2, Loader2, Package } from 'lucide-react';
import ProductFormModal from '@/components/admin/ProductFormModal';

const Admin: React.FC = () => {
  const { t, language, dir } = useLanguage();
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
    return names[language] || product.name_en;
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

  return (
    <Layout>
      <div className="container py-8" dir={dir}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            {t('admin')}
          </h1>
          <Button
            onClick={() => setIsFormOpen(true)}
            className="gradient-gold text-background font-semibold"
          >
            <Plus className="w-5 h-5 mr-2" />
            {t('addProduct')}
          </Button>
        </div>

        <Card className="border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5 text-gold" />
              Products ({products?.length || 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-gold" />
              </div>
            ) : !products || products.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {t('noProducts')}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>{t('productName')}</TableHead>
                      <TableHead>{t('productCategory')}</TableHead>
                      <TableHead>{t('price')}</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <img
                            src={product.images?.[0] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop'}
                            alt={getProductName(product)}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {getProductName(product)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {getCategoryLabel(product.category)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-gold text-background">
                            {product.price.toLocaleString()} DA
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleEdit(product)}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
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
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('deleteProduct')}</AlertDialogTitle>
              <AlertDialogDescription>
                {t('confirmDelete')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
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
