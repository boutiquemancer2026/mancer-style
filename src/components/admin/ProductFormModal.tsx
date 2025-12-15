import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Product, useCreateProduct, useUpdateProduct } from '@/hooks/useProducts';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, X, Plus, Image, Palette, Ruler } from 'lucide-react';

const productSchema = z.object({
  name_ar: z.string().optional(),
  name_fr: z.string().optional(),
  name_en: z.string().optional(),
  name_ber: z.string().optional(),
  description_ar: z.string().optional(),
  description_fr: z.string().optional(),
  description_en: z.string().optional(),
  description_ber: z.string().optional(),
  price: z.number().min(0, 'السعر يجب أن يكون موجباً'),
  category: z.enum(['men', 'women', 'children']),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  address: z.string().optional(),
}).refine((data) => {
  // At least one name is required
  return data.name_ar || data.name_fr || data.name_en || data.name_ber;
}, {
  message: 'يجب إدخال اسم المنتج بلغة واحدة على الأقل',
  path: ['name_ar'],
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const { t, dir } = useLanguage();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  
  const [images, setImages] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [newImage, setNewImage] = useState('');
  const [newColor, setNewColor] = useState('#000000');
  const [newSize, setNewSize] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category: 'men',
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        name_ar: product.name_ar || '',
        name_fr: product.name_fr || '',
        name_en: product.name_en || '',
        name_ber: product.name_ber || '',
        description_ar: product.description_ar || '',
        description_fr: product.description_fr || '',
        description_en: product.description_en || '',
        description_ber: product.description_ber || '',
        price: product.price,
        category: product.category as 'men' | 'women' | 'children',
        phone: product.phone || '',
        whatsapp: product.whatsapp || '',
        address: product.address || '',
      });
      setImages(product.images || []);
      setColors(product.colors || []);
      setSizes(product.sizes || []);
    } else {
      reset({
        name_ar: '',
        name_fr: '',
        name_en: '',
        name_ber: '',
        price: 0,
        category: 'men',
      });
      setImages([]);
      setColors([]);
      setSizes([]);
    }
  }, [product, reset]);

  const onSubmit = async (data: ProductFormData) => {
    const productData = {
      name_ar: data.name_ar || data.name_fr || data.name_en || data.name_ber || '',
      name_fr: data.name_fr || data.name_ar || data.name_en || data.name_ber || '',
      name_en: data.name_en || data.name_ar || data.name_fr || data.name_ber || '',
      name_ber: data.name_ber || data.name_ar || data.name_fr || data.name_en || '',
      description_ar: data.description_ar || null,
      description_fr: data.description_fr || null,
      description_en: data.description_en || null,
      description_ber: data.description_ber || null,
      price: data.price,
      category: data.category,
      phone: data.phone || null,
      whatsapp: data.whatsapp || null,
      address: data.address || null,
      images,
      colors,
      sizes,
      is_featured: false,
      location_lat: null,
      location_lng: null,
    };

    if (product) {
      await updateProduct.mutateAsync({ id: product.id, ...productData });
    } else {
      await createProduct.mutateAsync(productData);
    }
    
    onClose();
  };

  const addImage = () => {
    if (newImage.trim()) {
      setImages([...images, newImage.trim()]);
      setNewImage('');
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const addColor = () => {
    if (!colors.includes(newColor)) {
      setColors([...colors, newColor]);
    }
  };

  const removeColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const addSize = () => {
    if (newSize.trim() && !sizes.includes(newSize.trim())) {
      setSizes([...sizes, newSize.trim()]);
      setNewSize('');
    }
  };

  const removeSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const isSubmitting = createProduct.isPending || updateProduct.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-border/50" dir={dir}>
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {product ? t('editProduct') : t('addProduct')}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
          {/* Names - Only one required */}
          <div className="space-y-4">
            <Label className="text-base font-medium">اسم المنتج (لغة واحدة كافية)</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">العربية</Label>
                <Input {...register('name_ar')} dir="rtl" placeholder="اسم المنتج" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Français</Label>
                <Input {...register('name_fr')} placeholder="Nom du produit" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">English</Label>
                <Input {...register('name_en')} placeholder="Product name" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">ⵜⴰⵎⴰⵣⵉⵖⵜ</Label>
                <Input {...register('name_ber')} placeholder="ⵉⵙⵎ ⵏ ⵓⴼⴰⵔⵉⵙ" />
              </div>
            </div>
            {errors.name_ar && (
              <p className="text-sm text-destructive">{errors.name_ar.message}</p>
            )}
          </div>

          {/* Descriptions */}
          <div className="space-y-4">
            <Label className="text-base font-medium">الوصف (اختياري)</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">العربية</Label>
                <Textarea {...register('description_ar')} dir="rtl" rows={2} placeholder="وصف المنتج" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Français</Label>
                <Textarea {...register('description_fr')} rows={2} placeholder="Description" />
              </div>
            </div>
          </div>

          {/* Price & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-base font-medium">{t('price')} (DA)</Label>
              <Input
                type="number"
                step="0.01"
                {...register('price', { valueAsNumber: true })}
                className="h-12"
              />
              {errors.price && (
                <p className="text-sm text-destructive">{errors.price.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-base font-medium">{t('productCategory')}</Label>
              <Select
                defaultValue={product?.category || 'men'}
                onValueChange={(value) => setValue('category', value as 'men' | 'women' | 'children')}
              >
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="men">{t('men')}</SelectItem>
                  <SelectItem value="women">{t('women')}</SelectItem>
                  <SelectItem value="children">{t('children')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-3">
            <Label className="text-base font-medium flex items-center gap-2">
              <Image className="w-4 h-4" />
              {t('productImages')}
            </Label>
            <div className="flex gap-2">
              <Input
                placeholder="رابط الصورة"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                className="flex-1"
              />
              <Button type="button" variant="outline" onClick={addImage} className="shrink-0">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-3">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt=""
                    className="w-20 h-20 object-cover rounded-lg border border-border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="space-y-3">
            <Label className="text-base font-medium flex items-center gap-2">
              <Palette className="w-4 h-4" />
              {t('colors')}
            </Label>
            <div className="flex gap-2 items-center">
              <Input
                type="color"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                className="w-16 h-12 p-1 cursor-pointer"
              />
              <Button type="button" variant="outline" onClick={addColor} className="shrink-0">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {colors.map((color, index) => (
                <div key={index} className="relative group">
                  <div
                    className="w-10 h-10 rounded-full border-2 border-border shadow-sm cursor-pointer"
                    style={{ backgroundColor: color }}
                  />
                  <button
                    type="button"
                    onClick={() => removeColor(index)}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-3">
            <Label className="text-base font-medium flex items-center gap-2">
              <Ruler className="w-4 h-4" />
              {t('sizes')}
            </Label>
            <div className="flex gap-2">
              <Input
                placeholder="S, M, L, XL..."
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
                className="flex-1"
              />
              <Button type="button" variant="outline" onClick={addSize} className="shrink-0">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size, index) => (
                <div key={index} className="relative group">
                  <span className="inline-flex items-center justify-center px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                    {size}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeSize(index)}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>الهاتف</Label>
              <Input {...register('phone')} placeholder="+213..." />
            </div>
            <div className="space-y-2">
              <Label>واتساب</Label>
              <Input {...register('whatsapp')} placeholder="+213..." />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label>العنوان</Label>
            <Textarea {...register('address')} rows={2} placeholder="عنوان المتجر" />
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-end pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose} className="px-6">
              {t('cancel')}
            </Button>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground px-8"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                t('save')
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormModal;
