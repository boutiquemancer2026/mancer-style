-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_fr TEXT NOT NULL,
  name_en TEXT NOT NULL,
  name_ber TEXT NOT NULL,
  description_ar TEXT,
  description_fr TEXT,
  description_en TEXT,
  description_ber TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('men', 'women', 'children')),
  images TEXT[] DEFAULT '{}',
  colors TEXT[] DEFAULT '{}',
  sizes TEXT[] DEFAULT '{}',
  phone TEXT,
  whatsapp TEXT,
  location_lat DECIMAL(10,8),
  location_lng DECIMAL(11,8),
  address TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT,
  customer_location_lat DECIMAL(10,8),
  customer_location_lng DECIMAL(11,8),
  selected_color TEXT,
  selected_size TEXT,
  quantity INTEGER NOT NULL DEFAULT 1,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'delivered', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create store_settings table
CREATE TABLE public.store_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  store_name TEXT DEFAULT 'BOUTIQUE MANCER',
  phone TEXT,
  whatsapp TEXT,
  address TEXT,
  location_lat DECIMAL(10,8),
  location_lng DECIMAL(11,8),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;

-- Products are publicly readable
CREATE POLICY "Products are viewable by everyone" 
ON public.products FOR SELECT USING (true);

-- Orders are publicly insertable (customers can place orders)
CREATE POLICY "Anyone can create orders" 
ON public.orders FOR INSERT WITH CHECK (true);

-- Store settings are publicly readable
CREATE POLICY "Store settings are viewable by everyone" 
ON public.store_settings FOR SELECT USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_store_settings_updated_at
BEFORE UPDATE ON public.store_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default store settings
INSERT INTO public.store_settings (store_name, phone, whatsapp) 
VALUES ('BOUTIQUE MANCER', '+213000000000', '+213000000000');