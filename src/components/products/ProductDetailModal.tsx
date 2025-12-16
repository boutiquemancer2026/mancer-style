import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Product } from '@/hooks/useProducts';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageCircle, MapPin, ShoppingBag, X, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const constraintsRef = useRef(null);

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

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else if (info.offset.x < -threshold && currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
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
    } else if (product.address) {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(product.address)}`,
        '_blank'
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="max-w-lg w-full max-h-[95vh] overflow-hidden p-0 rounded-t-3xl"
        dir={dir}
      >
        <AnimatePresence mode="wait">
          {showOrderForm ? (
            <motion.div
              key="order-form"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="p-6"
            >
              <OrderForm
                product={product}
                onClose={() => setShowOrderForm(false)}
                onSuccess={() => {
                  setShowOrderForm(false);
                  onClose();
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="product-details"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="overflow-y-auto max-h-[95vh]"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Offer Badge */}
              {product.is_offer && (
                <div className="offer-badge">عرض خاص</div>
              )}

              {/* Image Gallery with Swipe */}
              <div 
                ref={constraintsRef}
                className="relative aspect-square overflow-hidden bg-muted"
              >
                <motion.div
                  className="flex h-full"
                  drag="x"
                  dragConstraints={constraintsRef}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  animate={{ x: -currentImageIndex * 100 + '%' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  style={{ width: `${images.length * 100}%` }}
                >
                  {images.map((image, index) => (
                    <div key={index} className="w-full h-full flex-shrink-0">
                      <img
                        src={image}
                        alt={getProductName()}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    </div>
                  ))}
                </motion.div>
                
                {images.length > 1 && (
                  <>
                    {/* Navigation Arrows */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full"
                      onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
                      disabled={currentImageIndex === 0}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full"
                      onClick={() => setCurrentImageIndex(Math.min(images.length - 1, currentImageIndex + 1))}
                      disabled={currentImageIndex === images.length - 1}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Button>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={cn(
                            'w-2 h-2 rounded-full transition-all',
                            index === currentImageIndex
                              ? 'bg-primary w-6'
                              : 'bg-background/60'
                          )}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6 space-y-5">
                {/* Title & Price */}
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl font-bold text-foreground flex-1">
                    {getProductName()}
                  </h2>
                  <Badge className="text-lg px-4 py-2 bg-primary text-primary-foreground font-bold shrink-0 rounded-xl">
                    {product.price.toLocaleString()} DA
                  </Badge>
                </div>

                {/* Description */}
                {getProductDescription() && (
                  <p className="text-muted-foreground leading-relaxed">
                    {getProductDescription()}
                  </p>
                )}

                {/* Colors */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 text-sm text-muted-foreground">{t('colors')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-full border-2 border-border shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizes */}
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 text-sm text-muted-foreground">{t('sizes')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="px-4 py-2 rounded-xl font-medium"
                        >
                          {size}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Buttons */}
                <div className="flex flex-wrap gap-2">
                  {product.phone && (
                    <Button
                      variant="outline"
                      onClick={handleCall}
                      className="flex items-center gap-2 rounded-xl"
                    >
                      <Phone className="w-4 h-4" />
                      {t('contact')}
                    </Button>
                  )}
                  {product.whatsapp && (
                    <Button
                      variant="outline"
                      onClick={handleWhatsApp}
                      className="flex items-center gap-2 rounded-xl border-green-500 text-green-600 hover:bg-green-50"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </Button>
                  )}
                  {(product.location_lat || product.address) && (
                    <Button
                      variant="outline"
                      onClick={handleLocation}
                      className="flex items-center gap-2 rounded-xl"
                    >
                      <MapPin className="w-4 h-4" />
                      {t('location')}
                    </Button>
                  )}
                </div>

                {/* Order Button */}
                <Button
                  size="lg"
                  className="w-full h-14 rounded-2xl gradient-primary font-bold text-lg"
                  onClick={() => setShowOrderForm(true)}
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  {t('orderNow')}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
