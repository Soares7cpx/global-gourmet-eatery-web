import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Loader2, ArrowLeft, Calendar, Clock, Users, MessageCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Reservation {
  id: string;
  name: string;
  date: string;
  time: string;
  guests: number;
  occasion: string | null;
  special_requests: string | null;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  confirmed: 'bg-green-500/20 text-green-400 border-green-500/30',
  cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
  completed: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
};

const statusLabels: Record<string, string> = {
  pending: 'Pendente',
  confirmed: 'Confirmada',
  cancelled: 'Cancelada',
  completed: 'Concluída'
};

const MinhasReservas = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchReservations();
    }
  }, [user]);

  const fetchReservations = async () => {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setReservations(data || []);
    } catch (err) {
      console.error('Error fetching reservations:', err);
    } finally {
      setLoading(false);
    }
  };

  const requestChange = (reservation: Reservation) => {
    const phoneNumber = '5511978345918';
    const message = `
Olá! Gostaria de solicitar uma alteração na minha reserva:

📋 *Dados da Reserva:*
• ID: ${reservation.id.slice(0, 8)}
• Data: ${format(new Date(reservation.date), 'PPP', { locale: ptBR })}
• Horário: ${reservation.time}
• Pessoas: ${reservation.guests}

Por favor, entre em contato comigo para ajustar os detalhes.
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para o site
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-playfair text-gradient mb-2">Minhas Reservas</h1>
          <p className="text-muted-foreground">
            Veja suas reservas. Para editar ou cancelar, entre em contato via WhatsApp.
          </p>
        </div>

        {reservations.length === 0 ? (
          <Card className="border-border/50 bg-card/50 backdrop-blur text-center py-12">
            <CardContent>
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Você ainda não tem reservas.</p>
              <Button onClick={() => navigate('/')} className="btn-gold">
                Fazer uma reserva
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {reservations.map((reservation) => (
              <Card key={reservation.id} className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium">
                      {format(new Date(reservation.date), "dd 'de' MMMM", { locale: ptBR })}
                    </CardTitle>
                    <Badge className={statusColors[reservation.status] || statusColors.pending}>
                      {statusLabels[reservation.status] || reservation.status}
                    </Badge>
                  </div>
                  <CardDescription>
                    Reserva #{reservation.id.slice(0, 8)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {reservation.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {reservation.guests} {reservation.guests === 1 ? 'pessoa' : 'pessoas'}
                    </div>
                    {reservation.occasion && (
                      <div className="text-primary">{reservation.occasion}</div>
                    )}
                  </div>
                  {reservation.special_requests && (
                    <p className="text-sm text-muted-foreground mb-4 italic">
                      "{reservation.special_requests}"
                    </p>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => requestChange(reservation)}
                    className="gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Solicitar alteração
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MinhasReservas;
