import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import LatestProductsSection from '@/components/home/LatestProductsSection';
import CategorySection from '@/components/home/CategorySection';
import ProductDetailModal from '@/components/products/ProductDetailModal';
import { Product } from '@/hooks/useProducts';

const Index: React.FC = () => {
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

  return (
    <Layout>
      <HeroSection />
      <LatestProductsSection onProductClick={handleProductClick} />
      <CategorySection />
      
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </Layout>
  );
};

export default Index;
