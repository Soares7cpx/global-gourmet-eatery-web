import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Send } from 'lucide-react';

const tourSchema = z.object({
  name: z.string().trim().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100, 'Nome muito longo'),
  email: z.string().trim().email('E-mail inválido').max(255, 'E-mail muito longo'),
  phone: z.string().trim().min(10, 'Telefone inválido').max(20, 'Telefone inválido'),
  tourPurpose: z.string().min(1, 'Selecione o motivo da visita'),
  groupSize: z.string().min(1, 'Informe o tamanho do grupo'),
  preferredDate: z.string().min(1, 'Selecione uma data preferencial'),
  message: z.string().trim().max(500, 'Mensagem muito longa').optional(),
});

type TourFormValues = z.infer<typeof tourSchema>;

interface TourRequestFormProps {
  onClose: () => void;
}

const TourRequestForm = ({ onClose }: TourRequestFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TourFormValues>({
    resolver: zodResolver(tourSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      tourPurpose: '',
      groupSize: '',
      preferredDate: '',
      message: '',
    },
  });

  const onSubmit = async (data: TourFormValues) => {
    setIsSubmitting(true);
    
    try {
      const message = `*🏛️ AGENDAMENTO DE VISITA - Mundo Gastronômico*

*👤 Dados Pessoais:*
Nome: ${data.name}
E-mail: ${data.email}
Telefone: ${data.phone}

*📋 Detalhes da Visita:*
Motivo: ${data.tourPurpose}
Tamanho do Grupo: ${data.groupSize}
Data Preferencial: ${data.preferredDate}

${data.message ? `*💬 Informações Adicionais:*\n${data.message}` : ''}

_Mensagem enviada via site Mundo Gastronômico_`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/5511978345918?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');
      
      toast.success('Redirecionando para WhatsApp!', {
        description: 'Continue a conversa para agendar sua visita.',
      });
      
      form.reset();
      onClose();
    } catch (error) {
      toast.error('Erro ao processar solicitação', {
        description: 'Por favor, tente novamente.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Dados de Contato</h3>
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo</FormLabel>
                <FormControl>
                  <Input placeholder="Seu nome completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="seu@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone / WhatsApp</FormLabel>
                <FormControl>
                  <Input placeholder="(11) 99999-9999" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Detalhes da Visita</h3>
          
          <FormField
            control={form.control}
            name="tourPurpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Motivo da Visita</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Por que deseja nos visitar?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="evento-corporativo">Evento Corporativo</SelectItem>
                    <SelectItem value="casamento">Casamento</SelectItem>
                    <SelectItem value="aniversario">Aniversário / Celebração</SelectItem>
                    <SelectItem value="jantar-grupo">Jantar em Grupo</SelectItem>
                    <SelectItem value="aula-particular">Aula Particular</SelectItem>
                    <SelectItem value="conhecer-espaco">Conhecer o Espaço</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="groupSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tamanho do Grupo</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Quantas pessoas?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1-5">1 a 5 pessoas</SelectItem>
                    <SelectItem value="6-10">6 a 10 pessoas</SelectItem>
                    <SelectItem value="11-20">11 a 20 pessoas</SelectItem>
                    <SelectItem value="21-50">21 a 50 pessoas</SelectItem>
                    <SelectItem value="51+">Mais de 50 pessoas</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferredDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data Preferencial</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Quando deseja visitar?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="proximos-dias">Próximos dias</SelectItem>
                    <SelectItem value="proxima-semana">Próxima semana</SelectItem>
                    <SelectItem value="proximo-mes">Próximo mês</SelectItem>
                    <SelectItem value="2-3-meses">2-3 meses</SelectItem>
                    <SelectItem value="ainda-definir">Ainda a definir</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Informações Adicionais (Opcional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Detalhes sobre o evento, preferências especiais, dúvidas..."
                    className="resize-none"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 btn-gold"
          >
            {isSubmitting ? (
              'Enviando...'
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Enviar via WhatsApp
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TourRequestForm;
