import { useState, useEffect } from 'react';
import { Loader2, Plus, Pencil, Trash2, UtensilsCrossed } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Category {
  id: string;
  name: string;
  description: string | null;
  display_order: number | null;
  is_active: boolean | null;
}

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category_id: string;
  is_available: boolean | null;
  image_url: string | null;
  preparation_time: number | null;
  display_order: number | null;
}

export default function AdminMenu() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Category dialog
  const [catDialogOpen, setCatDialogOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');
  const [catActive, setCatActive] = useState(true);
  const [savingCat, setSavingCat] = useState(false);

  // Item dialog
  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [itemName, setItemName] = useState('');
  const [itemDesc, setItemDesc] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemCatId, setItemCatId] = useState('');
  const [itemAvailable, setItemAvailable] = useState(true);
  const [itemPrepTime, setItemPrepTime] = useState('20');
  const [savingItem, setSavingItem] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    const [catRes, itemRes] = await Promise.all([
      supabase.from('menu_categories').select('*').order('display_order'),
      supabase.from('menu_items').select('*').order('display_order'),
    ]);
    if (catRes.data) setCategories(catRes.data);
    if (itemRes.data) setItems(itemRes.data);
    setLoading(false);
  };

  // Category CRUD
  const openNewCat = () => {
    setEditingCat(null); setCatName(''); setCatDesc(''); setCatActive(true);
    setCatDialogOpen(true);
  };
  const openEditCat = (c: Category) => {
    setEditingCat(c); setCatName(c.name); setCatDesc(c.description || '');
    setCatActive(c.is_active !== false); setCatDialogOpen(true);
  };
  const saveCat = async () => {
    if (!catName.trim()) { toast.error('Nome obrigatório'); return; }
    setSavingCat(true);
    if (editingCat) {
      const { error } = await supabase.from('menu_categories').update({
        name: catName.trim(), description: catDesc.trim() || null, is_active: catActive
      }).eq('id', editingCat.id);
      if (error) toast.error('Erro ao atualizar'); else toast.success('Categoria atualizada');
    } else {
      const { error } = await supabase.from('menu_categories').insert({
        name: catName.trim(), description: catDesc.trim() || null, is_active: catActive,
        display_order: categories.length
      });
      if (error) toast.error('Erro ao criar'); else toast.success('Categoria criada');
    }
    setSavingCat(false); setCatDialogOpen(false); fetchData();
  };
  const deleteCat = async (id: string) => {
    if (!confirm('Remover esta categoria? Os itens vinculados ficarão órfãos.')) return;
    const { error } = await supabase.from('menu_categories').delete().eq('id', id);
    if (error) toast.error('Erro ao remover'); else { toast.success('Categoria removida'); fetchData(); }
  };

  // Item CRUD
  const openNewItem = () => {
    setEditingItem(null); setItemName(''); setItemDesc(''); setItemPrice('');
    setItemCatId(categories[0]?.id || ''); setItemAvailable(true); setItemPrepTime('20');
    setItemDialogOpen(true);
  };
  const openEditItem = (i: MenuItem) => {
    setEditingItem(i); setItemName(i.name); setItemDesc(i.description || '');
    setItemPrice(String(i.price)); setItemCatId(i.category_id);
    setItemAvailable(i.is_available !== false); setItemPrepTime(String(i.preparation_time || 20));
    setItemDialogOpen(true);
  };
  const saveItem = async () => {
    if (!itemName.trim() || !itemPrice || !itemCatId) {
      toast.error('Preencha nome, preço e categoria'); return;
    }
    setSavingItem(true);
    const data = {
      name: itemName.trim(), description: itemDesc.trim() || null,
      price: parseFloat(itemPrice), category_id: itemCatId,
      is_available: itemAvailable, preparation_time: parseInt(itemPrepTime) || 20
    };
    if (editingItem) {
      const { error } = await supabase.from('menu_items').update(data).eq('id', editingItem.id);
      if (error) toast.error('Erro ao atualizar'); else toast.success('Item atualizado');
    } else {
      const { error } = await supabase.from('menu_items').insert({ ...data, display_order: items.length });
      if (error) toast.error('Erro ao criar'); else toast.success('Item criado');
    }
    setSavingItem(false); setItemDialogOpen(false); fetchData();
  };
  const deleteItem = async (id: string) => {
    if (!confirm('Remover este item do cardápio?')) return;
    const { error } = await supabase.from('menu_items').delete().eq('id', id);
    if (error) toast.error('Erro ao remover'); else { toast.success('Item removido'); fetchData(); }
  };

  const getCatName = (catId: string) => categories.find(c => c.id === catId)?.name || '—';

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-playfair font-bold text-gradient">Cardápio</h1>
        <p className="text-muted-foreground">Gerencie categorias e itens do cardápio</p>
      </div>

      <Tabs defaultValue="items">
        <TabsList>
          <TabsTrigger value="items">Itens ({items.length})</TabsTrigger>
          <TabsTrigger value="categories">Categorias ({categories.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={openNewCat} className="gap-2"><Plus className="h-4 w-4" />Nova Categoria</Button>
          </div>
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map(c => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.name}</TableCell>
                      <TableCell className="text-muted-foreground max-w-[200px] truncate">{c.description || '—'}</TableCell>
                      <TableCell>
                        <Badge className={c.is_active !== false ? 'bg-green-500/20 text-green-400' : 'bg-muted text-muted-foreground'}>
                          {c.is_active !== false ? 'Ativa' : 'Inativa'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="icon" variant="ghost" onClick={() => openEditCat(c)}><Pencil className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" className="text-destructive" onClick={() => deleteCat(c.id)}><Trash2 className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="items" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={openNewItem} className="gap-2"><Plus className="h-4 w-4" />Novo Item</Button>
          </div>
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map(i => (
                    <TableRow key={i.id}>
                      <TableCell className="font-medium">{i.name}</TableCell>
                      <TableCell className="text-muted-foreground">{getCatName(i.category_id)}</TableCell>
                      <TableCell>R$ {Number(i.price).toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className={i.is_available !== false ? 'bg-green-500/20 text-green-400' : 'bg-muted text-muted-foreground'}>
                          {i.is_available !== false ? 'Disponível' : 'Indisponível'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="icon" variant="ghost" onClick={() => openEditItem(i)}><Pencil className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" className="text-destructive" onClick={() => deleteItem(i.id)}><Trash2 className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Category Dialog */}
      <Dialog open={catDialogOpen} onOpenChange={setCatDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCat ? 'Editar Categoria' : 'Nova Categoria'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome</label>
              <Input value={catName} onChange={e => setCatName(e.target.value)} placeholder="Ex: Entradas" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Descrição</label>
              <Textarea value={catDesc} onChange={e => setCatDesc(e.target.value)} placeholder="Descrição opcional" />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={catActive} onCheckedChange={setCatActive} />
              <label className="text-sm">Ativa</label>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose>
            <Button onClick={saveCat} disabled={savingCat}>
              {savingCat ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Item Dialog */}
      <Dialog open={itemDialogOpen} onOpenChange={setItemDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Editar Item' : 'Novo Item'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome</label>
              <Input value={itemName} onChange={e => setItemName(e.target.value)} placeholder="Ex: Bruschetta" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Descrição</label>
              <Textarea value={itemDesc} onChange={e => setItemDesc(e.target.value)} placeholder="Descrição do prato" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Preço (R$)</label>
                <Input type="number" step="0.01" value={itemPrice} onChange={e => setItemPrice(e.target.value)} placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tempo (min)</label>
                <Input type="number" value={itemPrepTime} onChange={e => setItemPrepTime(e.target.value)} placeholder="20" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Categoria</label>
              <Select value={itemCatId} onValueChange={setItemCatId}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  {categories.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={itemAvailable} onCheckedChange={setItemAvailable} />
              <label className="text-sm">Disponível</label>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose>
            <Button onClick={saveItem} disabled={savingItem}>
              {savingItem ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
