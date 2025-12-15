import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

export interface OrderData {
  product_id: string;
  customer_name: string;
  customer_phone: string;
  customer_address?: string;
  customer_location_lat?: number;
  customer_location_lng?: number;
  selected_color?: string;
  selected_size?: string;
  quantity: number;
}

export const useCreateOrder = () => {
  const { toast } = useToast();
  const { t } = useLanguage();

  return useMutation({
    mutationFn: async (order: OrderData) => {
      const { data, error } = await supabase
        .from('orders')
        .insert([order])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: t('orderSuccess'),
      });
    },
    onError: (error) => {
      toast({
        title: 'Error creating order',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};
