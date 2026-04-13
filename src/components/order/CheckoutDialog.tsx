import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Tag, X, Loader2 } from 'lucide-react';

const formSchema = z.object({
  customerName: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  customerPhone: z.string().min(10, 'Telefone inválido'),
  customerEmail: z.string().email('Email inválido').optional().or(z.literal('')),
  deliveryAddress: z.string().min(10, 'Endereço deve ser mais detalhado'),
  deliveryNeighborhood: z.string().optional(),
  deliveryCity: z.string().min(2, 'Cidade é obrigatória'),
  deliveryState: z.string().length(2, 'Estado inválido (use sigla)'),
  deliveryZipcode: z.string().optional(),
  paymentMethod: z.enum(['cash', 'debit_card', 'credit_card', 'pix']),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CheckoutDialog = ({ open, onOpenChange }: CheckoutDialogProps) => {
  const { items, getTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount_type: string; discount_value: number } | null>(null);
  const [applyingCoupon, setApplyingCoupon] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      deliveryAddress: '',
      deliveryNeighborhood: '',
      deliveryCity: '',
      deliveryState: '',
      deliveryZipcode: '',
      paymentMethod: 'pix',
      notes: '',
    },
  });

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    setApplyingCoupon(true);
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', couponCode.trim().toUpperCase())
      .eq('is_active', true)
      .single();

    if (error || !data) {
      toast.error('Cupom inválido ou expirado');
    } else if (data.max_uses && data.used_count >= data.max_uses) {
      toast.error('Cupom esgotado');
    } else if (data.expires_at && new Date(data.expires_at) < new Date()) {
      toast.error('Cupom expirado');
    } else if (data.min_order_value && getTotal() < Number(data.min_order_value)) {
      toast.error(`Pedido mínimo: R$ ${Number(data.min_order_value).toFixed(2)}`);
    } else {
      setAppliedCoupon({ code: data.code, discount_type: data.discount_type, discount_value: Number(data.discount_value) });
      toast.success(`Cupom ${data.code} aplicado!`);
    }
    setApplyingCoupon(false);
  };

  const getDiscount = () => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.discount_type === 'percentage') return getTotal() * (appliedCoupon.discount_value / 100);
    return Math.min(appliedCoupon.discount_value, getTotal());
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      const subtotal = getTotal();
      const deliveryFee = 5.00;
      const discount = getDiscount();
      const total = subtotal + deliveryFee - discount;

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_name: values.customerName,
          customer_phone: values.customerPhone,
          customer_email: values.customerEmail || null,
          delivery_address: values.deliveryAddress,
          delivery_neighborhood: values.deliveryNeighborhood || null,
          delivery_city: values.deliveryCity,
          delivery_state: values.deliveryState,
          delivery_zipcode: values.deliveryZipcode || null,
          subtotal,
          delivery_fee: deliveryFee,
          total,
          payment_method: values.paymentMethod,
          notes: values.notes || null,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        menu_item_id: item.id,
        quantity: item.quantity,
        unit_price: item.price,
        subtotal: item.price * item.quantity,
        notes: item.notes || null,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Award loyalty points (1 point per R$1 spent)
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const pointsEarned = Math.floor(total);
        if (pointsEarned > 0) {
          await supabase.from('loyalty_points').insert({
            user_id: user.id,
            points: pointsEarned,
            transaction_type: 'earned',
            description: `Pedido #${order.id.slice(0, 8)}`,
            order_id: order.id,
          });
        }
      }

      toast.success('Pedido realizado com sucesso!', {
        description: `Número do pedido: ${order.id.slice(0, 8)}${user ? ` | +${Math.floor(total)} pontos!` : ''}`,
      });

      clearCart();
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Erro ao criar pedido. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Finalizar Pedido</DialogTitle>
          <DialogDescription>
            Preencha seus dados para concluir o pedido
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customerPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="(00) 00000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="customerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="seu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deliveryAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço de Entrega</FormLabel>
                  <FormControl>
                    <Input placeholder="Rua, número, complemento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="deliveryNeighborhood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro (opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Bairro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deliveryZipcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CEP (opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="00000-000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="deliveryCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="Cidade" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deliveryState"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input placeholder="SP" maxLength={2} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Forma de Pagamento</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pix">PIX</SelectItem>
                      <SelectItem value="credit_card">Cartão de Crédito</SelectItem>
                      <SelectItem value="debit_card">Cartão de Débito</SelectItem>
                      <SelectItem value="cash">Dinheiro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações (opcional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Alguma observação sobre o pedido?" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Coupon */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Cupom de desconto</label>
              {appliedCoupon ? (
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500/20 text-green-400 gap-1">
                    <Tag className="h-3 w-3" />{appliedCoupon.code}
                    {appliedCoupon.discount_type === 'percentage' ? ` -${appliedCoupon.discount_value}%` : ` -R$${appliedCoupon.discount_value.toFixed(2)}`}
                  </Badge>
                  <Button type="button" size="icon" variant="ghost" className="h-6 w-6" onClick={() => setAppliedCoupon(null)}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input placeholder="CÓDIGO" value={couponCode} onChange={e => setCouponCode(e.target.value)} className="uppercase" />
                  <Button type="button" variant="outline" onClick={applyCoupon} disabled={applyingCoupon}>
                    {applyingCoupon ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Aplicar'}
                  </Button>
                </div>
              )}
            </div>

            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>R$ {getTotal().toFixed(2)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-sm text-green-400">
                  <span>Desconto ({appliedCoupon.code})</span>
                  <span>- R$ {getDiscount().toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span>Taxa de entrega</span>
                <span>R$ 5,00</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span className="text-primary">R$ {(getTotal() + 5 - getDiscount()).toFixed(2)}</span>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full btn-gold" 
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processando...' : 'Confirmar Pedido'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;