import { useState } from 'react';
import { Clock, Plus, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import ReviewSection from '@/components/ReviewSection';

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
  const [reviewOpen, setReviewOpen] = useState(false);

  const handleAddToCart = () => {
    addItem({ id, name, price });
    toast.success(`${name} adicionado ao carrinho!`);
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-primary/10 hover:border-primary/30 group">
        {imageUrl && (
          <div className="aspect-video w-full overflow-hidden bg-muted relative">
            <img 
              src={imageUrl} 
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}
        <CardHeader className="space-y-2">
          <CardTitle className="text-xl group-hover:text-primary transition-colors">{name}</CardTitle>
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">R$ {price.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
              <Clock className="h-4 w-4 text-primary" />
              <span>{preparationTime} min</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button 
            className="flex-1 btn-gold" 
            onClick={handleAddToCart}
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
          <Button variant="outline" size="icon" onClick={() => setReviewOpen(true)} title="Ver avaliações">
            <Star className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{name}</DialogTitle>
          </DialogHeader>
          <ReviewSection menuItemId={id} menuItemName={name} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MenuItem;