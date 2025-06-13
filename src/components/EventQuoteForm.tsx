
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, MessageCircle, Users, Utensils } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { sendEventQuoteWhatsApp } from './reservation/EventWhatsAppService';

const formSchema = z.object({
  name: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  phone: z.string().min(8, { message: 'Telefone inválido' }),
  company: z.string().optional(),
  eventType: z.string({ required_error: 'Selecione o tipo de evento' }),
  date: z.date({ required_error: 'Selecione uma data' }),
  guests: z.string({ required_error: 'Informe o número de convidados' }),
  budget: z.string().optional(),
  requirements: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface EventQuoteFormProps {
  onClose: () => void;
}

const EventQuoteForm = ({ onClose }: EventQuoteFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      budget: '',
      requirements: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    console.log('Solicitação de orçamento enviada:', data);
    
    try {
      sendEventQuoteWhatsApp(data);
      
      setTimeout(() => {
        setIsSubmitting(false);
        toast.success('WhatsApp aberto!', {
          description: `${data.name}, o WhatsApp foi aberto com os dados do seu evento ${data.eventType}. Envie a mensagem para solicitar o orçamento.`,
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

  const eventTypes = [
    'Casamento',
    'Aniversário',
    'Evento Corporativo',
    'Confraternização',
    'Formatura',
    'Reunião de Negócios',
    'Lançamento de Produto',
    'Outro'
  ];

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <Utensils className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Solicitar Orçamento para Eventos</h2>
        <p className="text-muted-foreground">
          Transformamos seus eventos em experiências gastronômicas inesquecíveis
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome" {...field} />
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
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="(11) 97834-5918" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="seu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Empresa (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da empresa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eventType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Evento</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type} value={type.toLowerCase()}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="guests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Convidados</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="10-20">10-20 pessoas</SelectItem>
                      <SelectItem value="21-50">21-50 pessoas</SelectItem>
                      <SelectItem value="51-100">51-100 pessoas</SelectItem>
                      <SelectItem value="101-200">101-200 pessoas</SelectItem>
                      <SelectItem value="200+">Mais de 200 pessoas</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data do Evento</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="w-full pl-3 text-left font-normal"
                        >
                          {field.value ? (
                            format(field.value, 'PPP', { locale: ptBR })
                          ) : (
                            <span className="text-muted-foreground">Selecione uma data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        locale={ptBR}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Orçamento Estimado (opcional)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma faixa" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ate-5k">Até R$ 5.000</SelectItem>
                      <SelectItem value="5k-10k">R$ 5.000 - R$ 10.000</SelectItem>
                      <SelectItem value="10k-20k">R$ 10.000 - R$ 20.000</SelectItem>
                      <SelectItem value="20k-50k">R$ 20.000 - R$ 50.000</SelectItem>
                      <SelectItem value="50k+">Acima de R$ 50.000</Selectitem>
                      <SelectItem value="conversar">Prefiro conversar</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Nos ajuda a preparar uma proposta adequada
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="requirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Requisitos Especiais (opcional)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Descrição do evento, preferências de cardápio, restrições alimentares, etc." 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Descreva detalhes importantes sobre seu evento
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

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

export default EventQuoteForm;
