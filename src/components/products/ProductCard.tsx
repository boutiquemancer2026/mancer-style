import React from 'react';
import { Product } from '@/hooks/useProducts';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Eye, Star } from 'lucide-react';

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
    return names[language] || product.name_en || product.name_ar;
  };

  const defaultImage = 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=500&fit=crop';

  return (
    <Card
      onClick={onClick}
      className={cn(
        'group cursor-pointer overflow-hidden border-0 bg-card',
        'transition-all duration-500 ease-out',
        'hover:shadow-luxury hover:-translate-y-3',
        'animate-scale-in rounded-2xl'
      )}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        <img
          src={product.images?.[0] || defaultImage}
          alt={getProductName()}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        {/* View Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-14 h-14 rounded-full bg-background/90 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Eye className="w-6 h-6 text-foreground" />
          </div>
        </div>

        {/* Price Badge */}
        <Badge 
          className="absolute top-4 right-4 bg-gold text-primary-foreground font-bold px-4 py-1.5 rounded-xl shadow-lg text-sm"
        >
          {product.price.toLocaleString()} DA
        </Badge>

        {/* Featured Badge */}
        {product.is_featured && (
          <Badge 
            className="absolute top-4 left-4 bg-foreground text-background px-3 py-1.5 rounded-xl flex items-center gap-1"
          >
            <Star className="w-3 h-3 fill-gold text-gold" />
            <span className="text-xs">مميز</span>
          </Badge>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-foreground line-clamp-2 group-hover:text-gold transition-colors duration-300">
          {getProductName()}
        </h3>
        
        {/* Colors Preview */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 mt-4">
            {product.colors.slice(0, 5).map((color, index) => (
              <div
                key={index}
                className="w-5 h-5 rounded-full border-2 border-background shadow-sm ring-1 ring-border/50"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="text-xs text-muted-foreground font-medium ml-1">
                +{product.colors.length - 5}
              </span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
