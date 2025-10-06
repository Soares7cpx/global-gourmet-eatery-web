-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create menu categories table
CREATE TABLE public.menu_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create menu items table
CREATE TABLE public.menu_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES public.menu_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  preparation_time INTEGER DEFAULT 20,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  delivery_address TEXT NOT NULL,
  delivery_neighborhood TEXT,
  delivery_city TEXT NOT NULL,
  delivery_state TEXT NOT NULL,
  delivery_zipcode TEXT,
  subtotal DECIMAL(10, 2) NOT NULL CHECK (subtotal >= 0),
  delivery_fee DECIMAL(10, 2) DEFAULT 0 CHECK (delivery_fee >= 0),
  total DECIMAL(10, 2) NOT NULL CHECK (total >= 0),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled')),
  payment_method TEXT NOT NULL CHECK (payment_method IN ('cash', 'debit_card', 'credit_card', 'pix')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  menu_item_id UUID NOT NULL REFERENCES public.menu_items(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10, 2) NOT NULL CHECK (unit_price >= 0),
  subtotal DECIMAL(10, 2) NOT NULL CHECK (subtotal >= 0),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for menu_categories (public read)
CREATE POLICY "Anyone can view active categories"
ON public.menu_categories
FOR SELECT
USING (is_active = true);

-- RLS Policies for menu_items (public read)
CREATE POLICY "Anyone can view available menu items"
ON public.menu_items
FOR SELECT
USING (is_available = true);

-- RLS Policies for orders (public insert, own records read)
CREATE POLICY "Anyone can create orders"
ON public.orders
FOR INSERT
WITH CHECK (true);

-- RLS Policies for order_items (linked to order access)
CREATE POLICY "Anyone can create order items"
ON public.order_items
FOR INSERT
WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_menu_items_category_id ON public.menu_items(category_id);
CREATE INDEX idx_menu_items_is_available ON public.menu_items(is_available);
CREATE INDEX idx_menu_categories_is_active ON public.menu_categories(is_active);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_order_items_menu_item_id ON public.order_items(menu_item_id);

-- Create updated_at triggers
CREATE TRIGGER update_menu_categories_updated_at
BEFORE UPDATE ON public.menu_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at
BEFORE UPDATE ON public.menu_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample categories
INSERT INTO public.menu_categories (name, description, display_order) VALUES
('Entradas', 'Deliciosas opções para começar sua refeição', 1),
('Pratos Principais', 'Pratos internacionais cuidadosamente preparados', 2),
('Massas', 'Massas artesanais com receitas autênticas', 3),
('Sobremesas', 'Doces irresistíveis para finalizar', 4),
('Bebidas', 'Seleção especial de bebidas', 5);

-- Insert sample menu items
INSERT INTO public.menu_items (category_id, name, description, price, preparation_time, display_order) 
SELECT 
  c.id,
  'Bruschetta Italiana',
  'Pão italiano torrado com tomate fresco, manjericão e azeite extra virgem',
  24.90,
  15,
  1
FROM public.menu_categories c WHERE c.name = 'Entradas';

INSERT INTO public.menu_items (category_id, name, description, price, preparation_time, display_order)
SELECT 
  c.id,
  'Gyoza Japonesa',
  'Dumplings recheados com carne suína e legumes, servidos com molho ponzu',
  32.90,
  20,
  2
FROM public.menu_categories c WHERE c.name = 'Entradas';

INSERT INTO public.menu_items (category_id, name, description, price, preparation_time, display_order)
SELECT 
  c.id,
  'Paella Valenciana',
  'Arroz espanhol com frutos do mar, açafrão e legumes',
  89.90,
  45,
  1
FROM public.menu_categories c WHERE c.name = 'Pratos Principais';

INSERT INTO public.menu_items (category_id, name, description, price, preparation_time, display_order)
SELECT 
  c.id,
  'Coq au Vin',
  'Frango ao vinho tinto francês com cogumelos e bacon',
  78.90,
  50,
  2
FROM public.menu_categories c WHERE c.name = 'Pratos Principais';

INSERT INTO public.menu_items (category_id, name, description, price, preparation_time, display_order)
SELECT 
  c.id,
  'Carbonara Tradicional',
  'Massa com bacon, ovos, queijo pecorino e pimenta preta',
  54.90,
  25,
  1
FROM public.menu_categories c WHERE c.name = 'Massas';

INSERT INTO public.menu_items (category_id, name, description, price, preparation_time, display_order)
SELECT 
  c.id,
  'Tiramisu',
  'Sobremesa italiana clássica com café e mascarpone',
  28.90,
  10,
  1
FROM public.menu_categories c WHERE c.name = 'Sobremesas';

INSERT INTO public.menu_items (category_id, name, description, price, preparation_time, display_order)
SELECT 
  c.id,
  'Suco Natural',
  'Sucos frescos de frutas da estação',
  12.90,
  5,
  1
FROM public.menu_categories c WHERE c.name = 'Bebidas';