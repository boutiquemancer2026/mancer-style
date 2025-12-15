import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Product } from '@/hooks/useProducts';
import { useCreateOrder, OrderData } from '@/hooks/useOrders';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Loader2, Send } from 'lucide-react';

const orderSchema = z.object({
  customer_name: z.string().min(2, 'Name is required'),
  customer_phone: z.string().min(8, 'Phone is required'),
  customer_address: z.string().optional(),
  selected_color: z.string().optional(),
  selected_size: z.string().optional(),
  quantity: z.number().min(1).default(1),
});

type OrderFormData = z.infer<typeof orderSchema>;

interface OrderFormProps {
  product: Product;
  onClose: () => void;
  onSuccess: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ product, onClose, onSuccess }) => {
  const { t, dir } = useLanguage();
  const createOrder = useCreateOrder();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const onSubmit = async (data: OrderFormData) => {
    const orderData: OrderData = {
      product_id: product.id,
      customer_name: data.customer_name,
      customer_phone: data.customer_phone,
      customer_address: data.customer_address,
      selected_color: data.selected_color,
      selected_size: data.selected_size,
      quantity: data.quantity,
    };

    await createOrder.mutateAsync(orderData);
    onSuccess();
  };

  return (
    <div className="space-y-6" dir={dir}>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onClose}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-2xl font-display font-bold">{t('orderForm')}</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="customer_name">{t('yourName')} *</Label>
          <Input
            id="customer_name"
            {...register('customer_name')}
            className={errors.customer_name ? 'border-destructive' : ''}
          />
          {errors.customer_name && (
            <p className="text-sm text-destructive">{errors.customer_name.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="customer_phone">{t('yourPhone')} *</Label>
          <Input
            id="customer_phone"
            type="tel"
            {...register('customer_phone')}
            className={errors.customer_phone ? 'border-destructive' : ''}
          />
          {errors.customer_phone && (
            <p className="text-sm text-destructive">{errors.customer_phone.message}</p>
          )}
        </div>

        {/* Address */}
        <div className="space-y-2">
          <Label htmlFor="customer_address">{t('yourAddress')}</Label>
          <Textarea
            id="customer_address"
            {...register('customer_address')}
            rows={2}
          />
        </div>

        {/* Color Selection */}
        {product.colors && product.colors.length > 0 && (
          <div className="space-y-2">
            <Label>{t('selectColor')}</Label>
            <Select onValueChange={(value) => setValue('selected_color', value)}>
              <SelectTrigger>
                <SelectValue placeholder={t('selectColor')} />
              </SelectTrigger>
              <SelectContent>
                {product.colors.map((color, index) => (
                  <SelectItem key={index} value={color}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: color }}
                      />
                      {color}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Size Selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="space-y-2">
            <Label>{t('selectSize')}</Label>
            <Select onValueChange={(value) => setValue('selected_size', value)}>
              <SelectTrigger>
                <SelectValue placeholder={t('selectSize')} />
              </SelectTrigger>
              <SelectContent>
                {product.sizes.map((size, index) => (
                  <SelectItem key={index} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Quantity */}
        <div className="space-y-2">
          <Label htmlFor="quantity">{t('quantity')}</Label>
          <Input
            id="quantity"
            type="number"
            min={1}
            {...register('quantity', { valueAsNumber: true })}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full gradient-gold text-background font-semibold"
          disabled={createOrder.isPending}
        >
          {createOrder.isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              {t('submitOrder')}
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default OrderForm;
