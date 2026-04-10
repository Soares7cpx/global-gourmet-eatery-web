import { useState, useEffect } from 'react';
import { format, subDays, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { supabase } from '@/integrations/supabase/client';
import { StatsCards } from '@/components/admin/StatsCards';
import { Loader2, ShoppingBag, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['hsl(var(--primary))', '#22c55e', '#eab308', '#ef4444', '#8b5cf6'];

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, pending: 0, confirmed: 0, today: 0 });
  const [orderStats, setOrderStats] = useState({ totalOrders: 0, totalRevenue: 0, pendingOrders: 0 });
  const [reservationsByDay, setReservationsByDay] = useState<any[]>([]);
  const [ordersByDay, setOrdersByDay] = useState<any[]>([]);
  const [statusData, setStatusData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      const sevenDaysAgo = format(subDays(new Date(), 6), 'yyyy-MM-dd');

      const [resResult, ordResult] = await Promise.all([
        supabase.from('reservations').select('status, date, created_at'),
        supabase.from('orders').select('status, total, created_at'),
      ]);

      const reservations = resResult.data || [];
      const orders = ordResult.data || [];

      // Reservation stats
      setStats({
        total: reservations.length,
        pending: reservations.filter(r => r.status === 'pending').length,
        confirmed: reservations.filter(r => r.status === 'confirmed').length,
        today: reservations.filter(r => r.date === today).length,
      });

      // Order stats
      setOrderStats({
        totalOrders: orders.length,
        totalRevenue: orders.reduce((sum, o) => sum + Number(o.total), 0),
        pendingOrders: orders.filter(o => o.status === 'pending').length,
      });

      // Reservations by day (last 7 days)
      const dayMap: Record<string, number> = {};
      const orderDayMap: Record<string, number> = {};
      for (let i = 6; i >= 0; i--) {
        const d = format(subDays(new Date(), i), 'yyyy-MM-dd');
        dayMap[d] = 0;
        orderDayMap[d] = 0;
      }
      reservations.forEach(r => {
        const d = r.created_at?.slice(0, 10);
        if (d && d in dayMap) dayMap[d]++;
      });
      orders.forEach(o => {
        const d = o.created_at?.slice(0, 10);
        if (d && d in orderDayMap) orderDayMap[d]++;
      });
      setReservationsByDay(Object.entries(dayMap).map(([date, count]) => ({
        date: format(new Date(date + 'T12:00:00'), 'dd/MM', { locale: ptBR }), count
      })));
      setOrdersByDay(Object.entries(orderDayMap).map(([date, count]) => ({
        date: format(new Date(date + 'T12:00:00'), 'dd/MM', { locale: ptBR }), count
      })));

      // Status pie
      const statusCount: Record<string, number> = {};
      reservations.forEach(r => { statusCount[r.status] = (statusCount[r.status] || 0) + 1; });
      const statusLabels: Record<string, string> = { pending: 'Pendente', confirmed: 'Confirmada', cancelled: 'Cancelada', completed: 'Concluída' };
      setStatusData(Object.entries(statusCount).map(([key, value]) => ({
        name: statusLabels[key] || key, value
      })));

    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-playfair font-bold text-gradient">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do sistema</p>
      </div>

      <StatsCards stats={stats} />

      {/* Order Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/50 bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pedidos</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{orderStats.totalOrders}</div></CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-500">R$ {orderStats.totalRevenue.toFixed(2)}</div></CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos Pendentes</CardTitle>
            <ShoppingBag className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold text-yellow-500">{orderStats.pendingOrders}</div></CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/50 bg-card/50">
          <CardHeader><CardTitle className="text-sm font-medium">Reservas (últimos 7 dias)</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={reservationsByDay}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} allowDecimals={false} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))' }} />
                <Bar dataKey="count" name="Reservas" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50">
          <CardHeader><CardTitle className="text-sm font-medium">Pedidos (últimos 7 dias)</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={ordersByDay}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} allowDecimals={false} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))' }} />
                <Line type="monotone" dataKey="count" name="Pedidos" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Status Pie */}
      {statusData.length > 0 && (
        <Card className="border-border/50 bg-card/50">
          <CardHeader><CardTitle className="text-sm font-medium">Reservas por Status</CardTitle></CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
