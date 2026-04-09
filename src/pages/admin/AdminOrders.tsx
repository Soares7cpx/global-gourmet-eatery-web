import { useState, useEffect } from 'react';
import { Loader2, Eye, Package, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';

interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  delivery_address: string;
  delivery_city: string;
  delivery_neighborhood: string | null;
  total: number;
  status: string;
  payment_method: string;
  notes: string | null;
  created_at: string;
}

interface OrderItem {
  id: string;
  menu_item_id: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  notes: string | null;
  item_name?: string;
}

const STATUS_MAP: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: 'Pendente', color: 'bg-yellow-500/20 text-yellow-400', icon: Clock },
  preparing: { label: 'Preparando', color: 'bg-blue-500/20 text-blue-400', icon: Package },
  delivering: { label: 'Em Entrega', color: 'bg-purple-500/20 text-purple-400', icon: Truck },
  delivered: { label: 'Entregue', color: 'bg-green-500/20 text-green-400', icon: CheckCircle },
  cancelled: { label: 'Cancelado', color: 'bg-red-500/20 text-red-400', icon: XCircle },
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [detailOrder, setDetailOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) toast.error('Erro ao carregar pedidos');
    else setOrders(data || []);
    setLoading(false);
  };

  const viewDetails = async (order: Order) => {
    setDetailOrder(order);
    setLoadingItems(true);
    const { data: items } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', order.id);

    if (items && items.length > 0) {
      const menuItemIds = items.map(i => i.menu_item_id);
      const { data: menuItems } = await supabase
        .from('menu_items')
        .select('id, name')
        .in('id', menuItemIds);
      
      const enriched = items.map(item => ({
        ...item,
        item_name: menuItems?.find(m => m.id === item.menu_item_id)?.name || 'Item removido'
      }));
      setOrderItems(enriched);
    } else {
      setOrderItems([]);
    }
    setLoadingItems(false);
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdating(orderId);
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);
    if (error) toast.error('Erro ao atualizar');
    else {
      toast.success(`Status alterado para ${STATUS_MAP[newStatus]?.label || newStatus}`);
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      if (detailOrder?.id === orderId) setDetailOrder(prev => prev ? { ...prev, status: newStatus } : null);
    }
    setUpdating(null);
  };

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);
  const formatDate = (d: string) => new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-playfair font-bold text-gradient">Pedidos</h1>
        <p className="text-muted-foreground">Gerencie os pedidos do delivery</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {['all', 'pending', 'preparing', 'delivering', 'delivered', 'cancelled'].map(s => (
          <Button
            key={s}
            variant={filter === s ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(s)}
          >
            {s === 'all' ? `Todos (${orders.length})` : `${STATUS_MAP[s]?.label} (${orders.filter(o => o.status === s).length})`}
          </Button>
        ))}
      </div>

      <Card className="border-border/50 bg-card/50">
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">Nenhum pedido encontrado</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(order => {
                  const st = STATUS_MAP[order.status] || STATUS_MAP.pending;
                  return (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div className="font-medium">{order.customer_name}</div>
                        <div className="text-sm text-muted-foreground">{order.customer_phone}</div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{formatDate(order.created_at)}</TableCell>
                      <TableCell className="font-medium">R$ {Number(order.total).toFixed(2)}</TableCell>
                      <TableCell><Badge className={st.color}>{st.label}</Badge></TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="sm" variant="ghost" onClick={() => viewDetails(order)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Select
                          value={order.status}
                          onValueChange={(v) => updateStatus(order.id, v)}
                          disabled={updating === order.id}
                        >
                          <SelectTrigger className="w-[130px] h-8 inline-flex">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(STATUS_MAP).map(([k, v]) => (
                              <SelectItem key={k} value={k}>{v.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      <Dialog open={!!detailOrder} onOpenChange={() => setDetailOrder(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Pedido #{detailOrder?.id.slice(0, 8)}</DialogTitle>
          </DialogHeader>
          {detailOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">Cliente:</span> <strong>{detailOrder.customer_name}</strong></div>
                <div><span className="text-muted-foreground">Telefone:</span> {detailOrder.customer_phone}</div>
                <div className="col-span-2"><span className="text-muted-foreground">Endereço:</span> {detailOrder.delivery_address}, {detailOrder.delivery_neighborhood}, {detailOrder.delivery_city}</div>
                <div><span className="text-muted-foreground">Pagamento:</span> {detailOrder.payment_method}</div>
                <div><span className="text-muted-foreground">Total:</span> <strong>R$ {Number(detailOrder.total).toFixed(2)}</strong></div>
                {detailOrder.notes && <div className="col-span-2"><span className="text-muted-foreground">Obs:</span> {detailOrder.notes}</div>}
              </div>

              <div>
                <h4 className="font-medium mb-2">Itens</h4>
                {loadingItems ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <div className="space-y-2">
                    {orderItems.map(item => (
                      <div key={item.id} className="flex justify-between text-sm border-b border-border/50 pb-1">
                        <span>{item.quantity}x {item.item_name}</span>
                        <span>R$ {Number(item.subtotal).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
