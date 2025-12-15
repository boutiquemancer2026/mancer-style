import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import ProductDetailModal from '@/components/products/ProductDetailModal';
import { useProducts, Product } from '@/hooks/useProducts';
import { useLanguage } from '@/contexts/LanguageContext';

const Category: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { t } = useLanguage();
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

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-center mb-8 text-foreground">
          {getCategoryTitle()}
        </h1>
        
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
