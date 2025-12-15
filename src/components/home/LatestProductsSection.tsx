import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFeaturedProducts, Product } from '@/hooks/useProducts';
import ProductCarousel from '@/components/products/ProductCarousel';
import { Loader2, Package, Sparkles } from 'lucide-react';

interface LatestProductsSectionProps {
  onProductClick: (product: Product) => void;
}

const LatestProductsSection: React.FC<LatestProductsSectionProps> = ({ onProductClick }) => {
  const { t, dir } = useLanguage();
  const { data: products, isLoading } = useFeaturedProducts();

  if (isLoading) {
    return (
      <section className="py-20" dir={dir}>
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium text-gold">جديد</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              {t('latestProducts')}
            </h2>
          </div>
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-10 h-10 animate-spin text-gold" />
          </div>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return (
      <section className="py-20" dir={dir}>
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium text-gold">جديد</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              {t('latestProducts')}
            </h2>
          </div>
          <div className="text-center py-16">
            <Package className="w-20 h-20 mx-auto mb-6 text-muted-foreground/20" />
            <p className="text-muted-foreground text-lg">{t('noProducts')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 overflow-hidden" dir={dir}>
      <div className="container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-sm font-medium text-gold">جديد</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            {t('latestProducts')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            اكتشف أحدث الإضافات لمجموعتنا المتميزة
          </p>
        </div>
      </div>
      <ProductCarousel products={products} onProductClick={onProductClick} />
    </section>
  );
};

export default LatestProductsSection;
