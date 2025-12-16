import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useSearchProducts, Product } from '@/hooks/useProducts';
import ProductCard from '@/components/products/ProductCard';
import ProductDetailModal from '@/components/products/ProductDetailModal';
import { Input } from '@/components/ui/input';
import { Search as SearchIcon, Loader2 } from 'lucide-react';

const Search: React.FC = () => {
  const { t, dir } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { data: products, isLoading } = useSearchProducts(searchTerm);

  return (
    <Layout>
      <div className="px-4 py-6" dir={dir}>
        {/* Search Input */}
        <div className="relative mb-6">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t('search') + '...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        ) : searchTerm ? (
          <div className="text-center py-20 text-muted-foreground">
            {t('noProducts')}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            ابدأ البحث عن المنتجات
          </div>
        )}
      </div>

      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </Layout>
  );
};

export default Search;
