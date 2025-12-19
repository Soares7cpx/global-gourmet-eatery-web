import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MessageCircle, Loader2, LogIn } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

import { formSchema, FormValues } from './reservation/FormSchema';
import { sendReservationWhatsApp } from './reservation/ReservationWhatsAppService';
import PersonalInfoFields from './reservation/PersonalInfoFields';
import BookingDetailsFields from './reservation/BookingDetailsFields';
import AdditionalInfoFields from './reservation/AdditionalInfoFields';

interface ReservationFormProps {
  onClose: () => void;
}

const ReservationForm = ({ onClose }: ReservationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      occasion: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!user) {
      toast.error('Faça login para fazer uma reserva');
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to database
      const { error } = await supabase.from('reservations').insert({
        user_id: user.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        date: format(data.date, 'yyyy-MM-dd'),
        time: data.time,
        guests: parseInt(data.guests, 10),
        occasion: data.occasion || null,
        special_requests: data.message || null,
        status: 'pending'
      });

      if (error) throw error;

      // Send WhatsApp message
      sendReservationWhatsApp(data);

      toast.success('Reserva enviada!', {
        description: `${data.name}, sua reserva foi registrada para ${data.guests} pessoas em ${format(data.date, 'PPP', { locale: ptBR })} às ${data.time}. Envie a mensagem no WhatsApp para confirmar.`,
      });
      
      onClose();
    } catch (error) {
      console.error('Reservation error:', error);
      toast.error('Erro ao salvar reserva', {
        description: 'Tente novamente ou entre em contato via WhatsApp.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginClick = () => {
    onClose();
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 text-center">
        <LogIn className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Faça login para reservar</h3>
        <p className="text-muted-foreground mb-6">
          Você precisa estar logado para fazer uma reserva e acompanhar o status.
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button className="btn-gold" onClick={handleLoginClick}>
            Fazer Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PersonalInfoFields form={form} />
            <BookingDetailsFields form={form} />
          </div>

          <AdditionalInfoFields form={form} />

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="btn-gold" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Enviar via WhatsApp
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ReservationForm;
