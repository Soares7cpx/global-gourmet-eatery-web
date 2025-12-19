import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { supabase } from '@/integrations/supabase/client';
import { StatsCards } from '@/components/admin/StatsCards';
import { Loader2 } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    today: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const today = format(new Date(), 'yyyy-MM-dd');

      const { data: allReservations, error } = await supabase
        .from('reservations')
        .select('status, date');

      if (error) throw error;

      const total = allReservations?.length || 0;
      const pending = allReservations?.filter(r => r.status === 'pending').length || 0;
      const confirmed = allReservations?.filter(r => r.status === 'confirmed').length || 0;
      const todayCount = allReservations?.filter(r => r.date === today).length || 0;

      setStats({ total, pending, confirmed, today: todayCount });
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-playfair font-bold text-gradient">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do sistema</p>
      </div>

      <StatsCards stats={stats} />
    </div>
  );
}
