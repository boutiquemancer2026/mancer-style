import React from 'react';
import { Product } from '@/hooks/useProducts';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { language } = useLanguage();

  const getProductName = () => {
    const names: Record<Language, string> = {
      ar: product.name_ar,
      fr: product.name_fr,
      en: product.name_en,
      ber: product.name_ber,
    };
    return names[language] || product.name_en;
  };

  const defaultImage = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop';

  return (
    <Card
      onClick={onClick}
      className={cn(
        'group cursor-pointer overflow-hidden border-border/40',
        'transition-all duration-500 ease-out',
        'hover:shadow-luxury hover:border-gold/30 hover:-translate-y-2',
        'animate-fade-in'
      )}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={product.images?.[0] || defaultImage}
          alt={getProductName()}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Price Badge */}
        <Badge 
          className="absolute top-3 right-3 bg-gold text-background font-semibold px-3 py-1 shadow-lg"
        >
          {product.price.toLocaleString()} DA
        </Badge>

        {/* Featured Badge */}
        {product.is_featured && (
          <Badge 
            className="absolute top-3 left-3 bg-primary text-primary-foreground"
          >
            ⭐
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-display text-lg font-semibold text-foreground line-clamp-2 group-hover:text-gold transition-colors duration-300">
          {getProductName()}
        </h3>
        
        {/* Colors Preview */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex gap-1 mt-3">
            {product.colors.slice(0, 5).map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-border/50 shadow-sm"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="text-xs text-muted-foreground ml-1">
                +{product.colors.length - 5}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
