import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import ProductDetailModal from '@/components/products/ProductDetailModal';
import { useProducts, Product } from '@/hooks/useProducts';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles } from 'lucide-react';

const Category: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { t, dir } = useLanguage();
  const { data: products, isLoading } = useProducts(category);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const getCategoryTitle = () => {
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

  const getCategoryImage = () => {
    switch (category) {
      case 'men':
        return 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1920&h=400&fit=crop';
      case 'women':
        return 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=1920&h=400&fit=crop';
      case 'children':
        return 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1920&h=400&fit=crop';
      default:
        return 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=400&fit=crop';
    }
  };

  return (
    <Layout>
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={getCategoryImage()}
          alt={getCategoryTitle()}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center" dir={dir}>
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium text-gold">تشكيلة حصرية</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground drop-shadow-lg">
              {getCategoryTitle()}
            </h1>
            <p className="text-muted-foreground">
              {products?.length || 0} منتج متوفر
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <ProductGrid
          products={products || []}
          isLoading={isLoading}
          onProductClick={handleProductClick}
        />
      </div>

      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </Layout>
  );
};

export default Category;
