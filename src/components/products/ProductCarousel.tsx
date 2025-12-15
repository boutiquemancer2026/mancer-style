import React, { useEffect, useRef, useState } from 'react';
import { Product } from '@/hooks/useProducts';
import ProductCard from './ProductCard';
import { cn } from '@/lib/utils';

interface ProductCarouselProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, onProductClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate products for infinite scroll effect
  const duplicatedProducts = [...products, ...products];

  return (
    <div 
      className="relative overflow-hidden py-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={containerRef}
        className={cn(
          'flex gap-6 transition-transform',
          !isPaused && 'animate-carousel'
        )}
        style={{
          width: `${duplicatedProducts.length * 280}px`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {duplicatedProducts.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="flex-shrink-0 w-[260px]"
          >
            <ProductCard
              product={product}
              onClick={() => onProductClick(product)}
            />
          </div>
        ))}
      </div>

      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default ProductCarousel;
