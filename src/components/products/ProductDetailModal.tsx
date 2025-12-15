import React, { useState } from 'react';
import { Product } from '@/hooks/useProducts';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageCircle, MapPin, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import OrderForm from './OrderForm';
import { cn } from '@/lib/utils';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { language, t, dir } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showOrderForm, setShowOrderForm] = useState(false);

  if (!product) return null;

  const getProductName = () => {
    const names: Record<Language, string> = {
      ar: product.name_ar,
      fr: product.name_fr,
      en: product.name_en,
      ber: product.name_ber,
    };
    return names[language] || product.name_en;
  };

  const getProductDescription = () => {
    const descriptions: Record<Language, string | null> = {
      ar: product.description_ar,
      fr: product.description_fr,
      en: product.description_en,
      ber: product.description_ber,
    };
    return descriptions[language] || product.description_en || '';
  };

  const defaultImage = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=800&fit=crop';
  const images = product.images?.length > 0 ? product.images : [defaultImage];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleWhatsApp = () => {
    if (product.whatsapp) {
      window.open(`https://wa.me/${product.whatsapp.replace(/[^0-9]/g, '')}`, '_blank');
    }
  };

  const handleCall = () => {
    if (product.phone) {
      window.open(`tel:${product.phone}`, '_blank');
    }
  };

  const handleLocation = () => {
    if (product.location_lat && product.location_lng) {
      window.open(
        `https://www.google.com/maps?q=${product.location_lat},${product.location_lng}`,
        '_blank'
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="max-w-4xl max-h-[90vh] overflow-y-auto p-0"
        dir={dir}
      >
        {showOrderForm ? (
          <div className="p-6">
            <OrderForm
              product={product}
              onClose={() => setShowOrderForm(false)}
              onSuccess={() => {
                setShowOrderForm(false);
                onClose();
              }}
            />
          </div>
        ) : (
          <>
            {/* Image Gallery */}
            <div className="relative aspect-square md:aspect-video overflow-hidden bg-muted">
              <img
                src={images[currentImageIndex]}
                alt={getProductName()}
                className="w-full h-full object-cover"
              />
              
              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                  
                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={cn(
                          'w-2 h-2 rounded-full transition-all',
                          index === currentImageIndex
                            ? 'bg-gold w-6'
                            : 'bg-background/60 hover:bg-background'
                        )}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Product Info */}
            <div className="p-6 space-y-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-display font-bold text-foreground">
                  {getProductName()}
                </DialogTitle>
              </DialogHeader>

              {/* Price */}
              <Badge className="text-xl px-4 py-2 bg-gold text-background font-bold">
                {product.price.toLocaleString()} DA
              </Badge>

              {/* Description */}
              {getProductDescription() && (
                <p className="text-muted-foreground leading-relaxed">
                  {getProductDescription()}
                </p>
              )}

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">{t('colors')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full border-2 border-border shadow-sm cursor-pointer hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">{t('sizes')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="px-3 py-1 hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
                      >
                        {size}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Buttons */}
              <div className="flex flex-wrap gap-3">
                {product.phone && (
                  <Button
                    variant="outline"
                    onClick={handleCall}
                    className="flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    {t('contact')}
                  </Button>
                )}
                {product.whatsapp && (
                  <Button
                    variant="outline"
                    onClick={handleWhatsApp}
                    className="flex items-center gap-2 border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </Button>
                )}
                {product.location_lat && product.location_lng && (
                  <Button
                    variant="outline"
                    onClick={handleLocation}
                    className="flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4" />
                    {t('location')}
                  </Button>
                )}
              </div>

              {/* Order Button */}
              <Button
                size="lg"
                className="w-full gradient-gold text-background font-semibold shadow-luxury hover:opacity-90 transition-opacity"
                onClick={() => setShowOrderForm(true)}
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                {t('orderNow')}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
