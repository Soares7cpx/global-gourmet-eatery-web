import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

export function useRealtimeNotifications() {
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (!isAdmin) return;

    const channel = supabase
      .channel('admin-notifications')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'reservations' },
        (payload) => {
          const r = payload.new as any;
          toast.info('🍽️ Nova Reserva!', {
            description: `${r.name} — ${r.guests} pessoas em ${r.date}`,
            duration: 8000,
          });
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => {
          const o = payload.new as any;
          toast.info('📦 Novo Pedido!', {
            description: `${o.customer_name} — R$ ${Number(o.total).toFixed(2)}`,
            duration: 8000,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAdmin]);
}
