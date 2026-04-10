import { useState, useEffect } from 'react';
import { Loader2, Plus, Pencil, Trash2, Tag } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';

interface Coupon {
  id: string;
  code: string;
  discount_type: string;
  discount_value: number;
  min_order_value: number;
  max_uses: number | null;
  used_count: number;
  is_active: boolean;
  expires_at: string | null;
  created_at: string;
}

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Coupon | null>(null);
  const [saving, setSaving] = useState(false);

  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState('percentage');
  const [discountValue, setDiscountValue] = useState('');
  const [minOrder, setMinOrder] = useState('0');
  const [maxUses, setMaxUses] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [expiresAt, setExpiresAt] = useState('');

  useEffect(() => { fetchCoupons(); }, []);

  const fetchCoupons = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) toast.error('Erro ao carregar cupons');
    else setCoupons(data || []);
    setLoading(false);
  };

  const openNew = () => {
    setEditing(null); setCode(''); setDiscountType('percentage');
    setDiscountValue(''); setMinOrder('0'); setMaxUses(''); setIsActive(true); setExpiresAt('');
    setDialogOpen(true);
  };

  const openEdit = (c: Coupon) => {
    setEditing(c); setCode(c.code); setDiscountType(c.discount_type);
    setDiscountValue(String(c.discount_value)); setMinOrder(String(c.min_order_value || 0));
    setMaxUses(c.max_uses ? String(c.max_uses) : ''); setIsActive(c.is_active);
    setExpiresAt(c.expires_at ? c.expires_at.slice(0, 16) : '');
    setDialogOpen(true);
  };

  const save = async () => {
    if (!code.trim() || !discountValue) { toast.error('Preencha código e valor'); return; }
    setSaving(true);
    const data: any = {
      code: code.trim().toUpperCase(),
      discount_type: discountType,
      discount_value: parseFloat(discountValue),
      min_order_value: parseFloat(minOrder) || 0,
      max_uses: maxUses ? parseInt(maxUses) : null,
      is_active: isActive,
      expires_at: expiresAt ? new Date(expiresAt).toISOString() : null,
    };
    if (editing) {
      const { error } = await supabase.from('coupons').update(data).eq('id', editing.id);
      if (error) toast.error('Erro ao atualizar'); else toast.success('Cupom atualizado');
    } else {
      const { error } = await supabase.from('coupons').insert(data);
      if (error) toast.error(error.message.includes('unique') ? 'Código já existe' : 'Erro ao criar');
      else toast.success('Cupom criado');
    }
    setSaving(false); setDialogOpen(false); fetchCoupons();
  };

  const deleteCoupon = async (id: string) => {
    if (!confirm('Remover este cupom?')) return;
    const { error } = await supabase.from('coupons').delete().eq('id', id);
    if (error) toast.error('Erro ao remover'); else { toast.success('Cupom removido'); fetchCoupons(); }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-playfair font-bold text-gradient">Cupons de Desconto</h1>
          <p className="text-muted-foreground">Gerencie seus cupons promocionais</p>
        </div>
        <Button onClick={openNew} className="gap-2"><Plus className="h-4 w-4" />Novo Cupom</Button>
      </div>

      <Card className="border-border/50 bg-card/50">
        <CardContent className="p-0">
          {coupons.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">Nenhum cupom criado</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Desconto</TableHead>
                  <TableHead>Uso</TableHead>
                  <TableHead>Validade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coupons.map(c => (
                  <TableRow key={c.id}>
                    <TableCell className="font-mono font-bold">{c.code}</TableCell>
                    <TableCell>
                      {c.discount_type === 'percentage' ? `${c.discount_value}%` : `R$ ${Number(c.discount_value).toFixed(2)}`}
                    </TableCell>
                    <TableCell>{c.used_count}{c.max_uses ? `/${c.max_uses}` : ''}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {c.expires_at ? new Date(c.expires_at).toLocaleDateString('pt-BR') : 'Sem prazo'}
                    </TableCell>
                    <TableCell>
                      <Badge className={c.is_active ? 'bg-green-500/20 text-green-400' : 'bg-muted text-muted-foreground'}>
                        {c.is_active ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="icon" variant="ghost" onClick={() => openEdit(c)}><Pencil className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" className="text-destructive" onClick={() => deleteCoupon(c.id)}><Trash2 className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? 'Editar Cupom' : 'Novo Cupom'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Código</label>
              <Input value={code} onChange={e => setCode(e.target.value)} placeholder="DESCONTO10" className="uppercase" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo</label>
                <Select value={discountType} onValueChange={setDiscountType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentual (%)</SelectItem>
                    <SelectItem value="fixed">Valor fixo (R$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Valor</label>
                <Input type="number" step="0.01" value={discountValue} onChange={e => setDiscountValue(e.target.value)} placeholder="10" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Pedido mínimo (R$)</label>
                <Input type="number" step="0.01" value={minOrder} onChange={e => setMinOrder(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Limite de usos</label>
                <Input type="number" value={maxUses} onChange={e => setMaxUses(e.target.value)} placeholder="Ilimitado" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Validade</label>
              <Input type="datetime-local" value={expiresAt} onChange={e => setExpiresAt(e.target.value)} />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={isActive} onCheckedChange={setIsActive} />
              <label className="text-sm">Ativo</label>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose>
            <Button onClick={save} disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
