import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Product {
  id: string;
  name_ar: string;
  name_fr: string;
  name_en: string;
  name_ber: string;
  description_ar: string | null;
  description_fr: string | null;
  description_en: string | null;
  description_ber: string | null;
  price: number;
  category: 'men' | 'women' | 'children';
  images: string[];
  colors: string[];
  sizes: string[];
  phone: string | null;
  whatsapp: string | null;
  location_lat: number | null;
  location_lng: number | null;
  address: string | null;
  is_featured: boolean;
  is_offer: boolean;
  created_at: string;
  updated_at: string;
}

export const useProducts = (category?: string) => {
  return useQuery({
    queryKey: ['products', category],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (category) {
        query = query.eq('category', category);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as Product[];
    },
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data as Product[];
    },
  });
};

export const useSearchProducts = (searchTerm: string) => {
  return useQuery({
    queryKey: ['products', 'search', searchTerm],
    queryFn: async () => {
      if (!searchTerm.trim()) return [];
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or(`name_ar.ilike.%${searchTerm}%,name_fr.ilike.%${searchTerm}%,name_en.ilike.%${searchTerm}%,name_ber.ilike.%${searchTerm}%`)
        .order('name_ar', { ascending: true });
      
      if (error) throw error;
      return data as Product[];
    },
    enabled: searchTerm.trim().length > 0,
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) throw error;
      return data as Product | null;
    },
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: 'تم إضافة المنتج بنجاح',
      });
    },
    onError: (error) => {
      toast({
        title: 'خطأ في إضافة المنتج',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...product }: Partial<Product> & { id: string }) => {
      const { data, error } = await supabase
        .from('products')
        .update(product)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: 'تم تحديث المنتج بنجاح',
      });
    },
    onError: (error) => {
      toast({
        title: 'خطأ في تحديث المنتج',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: 'تم حذف المنتج بنجاح',
      });
    },
    onError: (error) => {
      toast({
        title: 'خطأ في حذف المنتج',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};
