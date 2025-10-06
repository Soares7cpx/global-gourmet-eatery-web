import { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import MenuItem from '@/components/order/MenuItem';
import CartSheet from '@/components/order/CartSheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

interface MenuCategory {
  id: string;
  name: string;
  description: string;
}

interface MenuItemData {
  id: string;
  name: string;
  description: string;
  price: number;
  preparation_time: number;
  image_url: string | null;
  category_id: string;
}

const Order = () => {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItemData[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    
    // Load categories
    const { data: categoriesData } = await supabase
      .from('menu_categories')
      .select('*')
      .eq('is_active', true)
      .order('display_order');

    if (categoriesData && categoriesData.length > 0) {
      setCategories(categoriesData);
      setActiveCategory(categoriesData[0].id);
    }

    // Load menu items
    const { data: itemsData } = await supabase
      .from('menu_items')
      .select('*')
      .eq('is_available', true)
      .order('display_order');

    if (itemsData) {
      setMenuItems(itemsData);
    }

    setIsLoading(false);
  };

  const filteredItems = menuItems.filter(item => item.category_id === activeCategory);

  useEffect(() => {
    document.title = 'Pedidos Online - Mundo Gastronômico';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="font-playfair text-2xl font-bold text-gradient">
                    Pedidos Online
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Mundo Gastronômico
                  </p>
                </div>
              </div>
              <CartSheet />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-2">
              Nosso Menu
            </h2>
            <p className="text-muted-foreground">
              Selecione seus pratos favoritos e adicione ao carrinho
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-8">
              <div className="flex gap-2 justify-center">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-10 w-32" />
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-96 rounded-lg" />
                ))}
              </div>
            </div>
          ) : (
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto gap-2 bg-transparent">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="mt-8">
                  {category.description && (
                    <p className="text-center text-muted-foreground mb-8">
                      {category.description}
                    </p>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.length === 0 ? (
                      <div className="col-span-full text-center py-12 text-muted-foreground">
                        Nenhum item disponível nesta categoria
                      </div>
                    ) : (
                      filteredItems.map((item) => (
                        <MenuItem
                          key={item.id}
                          id={item.id}
                          name={item.name}
                          description={item.description || ''}
                          price={parseFloat(item.price.toString())}
                          preparationTime={item.preparation_time}
                          imageUrl={item.image_url || undefined}
                        />
                      ))
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </main>
      </div>
    );
};

export default Order;