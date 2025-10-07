-- Adicionar mais pratos variados ao menu

-- Entradas adicionais
INSERT INTO public.menu_items (name, description, price, category_id, preparation_time, display_order, is_available) 
SELECT 
  'Carpaccio de Salmão',
  'Fatias finas de salmão fresco com alcaparras, rúcula e molho de limão siciliano',
  35.90,
  id,
  15,
  4,
  true
FROM public.menu_categories WHERE name = 'Entradas';

INSERT INTO public.menu_items (name, description, price, category_id, preparation_time, display_order, is_available) 
SELECT 
  'Tábua de Frios Premium',
  'Seleção de queijos e frios importados com geleias artesanais e torradas',
  52.00,
  id,
  10,
  5,
  true
FROM public.menu_categories WHERE name = 'Entradas';

INSERT INTO public.menu_items (name, description, price, category_id, preparation_time, display_order, is_available) 
SELECT 
  'Camarão ao Alho e Óleo',
  'Camarões grandes salteados com alho, azeite extra virgem e pimenta calabresa',
  42.90,
  id,
  12,
  6,
  true
FROM public.menu_categories WHERE name = 'Entradas';

-- Pratos principais adicionais
INSERT INTO public.menu_items (name, description, price, category_id, preparation_time, display_order, is_available) 
SELECT 
  'Picanha na Brasa',
  'Picanha argentina grelhada ao ponto, acompanha arroz, farofa, vinagrete e batatas',
  68.00,
  id,
  35,
  4,
  true
FROM public.menu_categories WHERE name = 'Pratos Principais';

INSERT INTO public.menu_items (name, description, price, category_id, preparation_time, display_order, is_available) 
SELECT 
  'Salmão Grelhado',
  'Filé de salmão grelhado com crosta de ervas, molho de maracujá e legumes na manteiga',
  59.90,
  id,
  25,
  5,
  true
FROM public.menu_categories WHERE name = 'Pratos Principais';

INSERT INTO public.menu_items (name, description, price, category_id, preparation_time, display_order, is_available) 
SELECT 
  'Risoto de Funghi Porcini',
  'Arroz arbóreo cremoso com cogumelos porcini importados e parmesão',
  54.00,
  id,
  30,
  6,
  true
FROM public.menu_categories WHERE name = 'Pratos Principais';

INSERT INTO public.menu_items (name, description, price, category_id, preparation_time, display_order, is_available) 
SELECT 
  'Frango à Parmegiana',
  'Filé de frango empanado com molho de tomate caseiro, queijo e presunto, com fritas',
  45.90,
  id,
  25,
  7,
  true
FROM public.menu_categories WHERE name = 'Pratos Principais';

INSERT INTO public.menu_items (name, description, price, category_id, preparation_time, display_order, is_available) 
SELECT 
  'Paella Valenciana',
  'Arroz especial com frutos do mar, frango, chorizo e açafrão (serve 2 pessoas)',
  98.00,
  id,
  40,
  8,
  true
FROM public.menu_categories WHERE name = 'Pratos Principais';

-- Massas adicionais
INSERT INTO public.menu_items (name, description, price, category_id, preparation_time, display_order, is_available) 
SELECT 
  'Lasagna Bolonhesa',
  'Camadas de massa fresca, molho bolonhesa artesanal e bechamel gratinado',
  48.90,
  id,
  20,
  4,
  true
FROM public.menu_categories WHERE name = 'Massas';

INSERT INTO public.menu_items (name, description, price, category_id, preparation_time, display_order, is_available) 
SELECT 
  'Ravioli de Queijo ao Sugo',
  'Ravioli recheado com quatro queijos ao molho de tomate caseiro e manjericão',
  42.00,
  id,
  18,
  5,
  true
FROM public.menu_categories WHERE name = 'Massas';

INSERT INTO public.menu_items (name, description, price, category_id, preparation_time, display_order, is_available) 
SELECT 
  'Fettuccine Alfredo',
  'Massa fresca ao molho de creme de leite, parmesão e manteiga',
  39.90,
  id,
  15,
  6,
  true
FROM public.menu_categories WHERE name = 'Massas';

-- Sobremesas adicionais
INSERT INTO public.menu_items (name, description, price, category_id, preparation_time, display_order, is_available) 
SELECT 
  'Tiramisù Italiano',
  'Clássica sobremesa italiana com café, mascarpone e cacau',
  22.00,
  id,
  5,
  4,
  true
FROM public.menu_categories WHERE name = 'Sobremesas';

INSERT INTO public.menu_items (name, description, price, category_id, preparation_time, display_order, is_available) 
SELECT 
  'Cheesecake de Frutas Vermelhas',
  'Torta de cream cheese com calda de frutas vermelhas e base crocante',
  24.90,
  id,
  5,
  5,
  true
FROM public.menu_categories WHERE name = 'Sobremesas';

INSERT INTO public.menu_items (name, description, price, category_id, preparation_time, display_order, is_available) 
SELECT 
  'Crème Brûlée',
  'Clássico creme francês com açúcar queimado e baunilha de Madagascar',
  19.90,
  id,
  5,
  6,
  true
FROM public.menu_categories WHERE name = 'Sobremesas';

INSERT INTO public.menu_items (name, description, price, category_id, preparation_time, display_order, is_available) 
SELECT 
  'Petit Gateau',
  'Bolinho de chocolate quente com sorvete de baunilha e calda de chocolate',
  26.00,
  id,
  8,
  7,
  true
FROM public.menu_categories WHERE name = 'Sobremesas';