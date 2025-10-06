import { Clock, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';

interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  preparationTime: number;
  imageUrl?: string;
}

const MenuItem = ({ id, name, description, price, preparationTime, imageUrl }: MenuItemProps) => {
  const addItem = useCart((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({ id, name, price });
    toast.success(`${name} adicionado ao carrinho!`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {imageUrl && (
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img 
            src={imageUrl} 
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">R$ {price.toFixed(2)}</span>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{preparationTime} min</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full btn-gold" 
          onClick={handleAddToCart}
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar ao Carrinho
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MenuItem;