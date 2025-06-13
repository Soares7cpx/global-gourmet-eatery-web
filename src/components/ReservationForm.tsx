
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MessageCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toast } from 'sonner';

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
    setIsSubmitting(true);
    
    console.log('Formulário enviado:', data);
    
    try {
      // Send WhatsApp message
      sendReservationWhatsApp(data);
      
      setTimeout(() => {
        setIsSubmitting(false);
        toast.success('WhatsApp aberto!', {
          description: `${data.name}, o WhatsApp foi aberto com os dados da sua reserva para ${data.guests} pessoas em ${format(data.date, 'PPP', { locale: ptBR })} às ${data.time}. Envie a mensagem para confirmar sua reserva.`,
        });
        onClose();
      }, 1500);
    } catch (error) {
      setIsSubmitting(false);
      toast.error('Erro ao abrir WhatsApp', {
        description: 'Houve um problema ao abrir o WhatsApp. Verifique se você tem o WhatsApp instalado.',
      });
    }
  };

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
                  <MessageCircle className="mr-2 h-4 w-4 animate-spin" />
                  Abrindo WhatsApp...
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
