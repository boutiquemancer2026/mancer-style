import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFeaturedProducts, Product } from '@/hooks/useProducts';
import ProductCarousel from '@/components/products/ProductCarousel';
import { Loader2 } from 'lucide-react';

interface LatestProductsSectionProps {
  onProductClick: (product: Product) => void;
}

const LatestProductsSection: React.FC<LatestProductsSectionProps> = ({ onProductClick }) => {
  const { t } = useLanguage();
  const { data: products, isLoading } = useFeaturedProducts();

  if (isLoading) {
    return (
      <section className="py-12">
        <div className="container">
          <h2 className="text-3xl font-display font-bold text-center mb-8 text-foreground">
            {t('latestProducts')}
          </h2>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-gold" />
          </div>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return (
      <section className="py-12">
        <div className="container">
          <h2 className="text-3xl font-display font-bold text-center mb-8 text-foreground">
            {t('latestProducts')}
          </h2>
          <p className="text-center text-muted-foreground">{t('noProducts')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 overflow-hidden">
      <div className="container">
        <h2 className="text-3xl font-display font-bold text-center mb-8 text-foreground">
          {t('latestProducts')}
        </h2>
      </div>
      <ProductCarousel products={products} onProductClick={onProductClick} />
    </section>
  );
};

export default LatestProductsSection;
