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

const courseSchema = z.object({
  name: z.string().trim().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100, 'Nome muito longo'),
  email: z.string().trim().email('E-mail inválido').max(255, 'E-mail muito longo'),
  phone: z.string().trim().min(10, 'Telefone inválido').max(20, 'Telefone inválido'),
  courseType: z.string().min(1, 'Selecione o tipo de aula'),
  experienceLevel: z.string().min(1, 'Selecione seu nível'),
  preferredSchedule: z.string().min(1, 'Selecione o horário preferido'),
  message: z.string().trim().max(500, 'Mensagem muito longa').optional(),
});

type CourseFormValues = z.infer<typeof courseSchema>;

interface CourseEnrollmentFormProps {
  onClose: () => void;
}

const CourseEnrollmentForm = ({ onClose }: CourseEnrollmentFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      courseType: '',
      experienceLevel: '',
      preferredSchedule: '',
      message: '',
    },
  });

  const onSubmit = async (data: CourseFormValues) => {
    setIsSubmitting(true);
    
    try {
      const message = `*🎓 INSCRIÇÃO EM AULA - Mundo Gastronômico*

*👤 Dados Pessoais:*
Nome: ${data.name}
E-mail: ${data.email}
Telefone: ${data.phone}

*📚 Informações do Curso:*
Tipo de Aula: ${data.courseType}
Nível de Experiência: ${data.experienceLevel}
Horário Preferido: ${data.preferredSchedule}

${data.message ? `*💬 Mensagem Adicional:*\n${data.message}` : ''}

_Mensagem enviada via site Mundo Gastronômico_`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/5511978345918?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');
      
      toast.success('Redirecionando para WhatsApp!', {
        description: 'Continue a conversa para finalizar sua inscrição.',
      });
      
      form.reset();
      onClose();
    } catch (error) {
      toast.error('Erro ao processar inscrição', {
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
          <h3 className="text-lg font-semibold text-foreground">Dados Pessoais</h3>
          
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
          <h3 className="text-lg font-semibold text-foreground">Informações do Curso</h3>
          
          <FormField
            control={form.control}
            name="courseType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Aula</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de aula" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="culinaria-italiana">Culinária Italiana</SelectItem>
                    <SelectItem value="culinaria-japonesa">Culinária Japonesa</SelectItem>
                    <SelectItem value="culinaria-francesa">Culinária Francesa</SelectItem>
                    <SelectItem value="culinaria-tailandesa">Culinária Tailandesa</SelectItem>
                    <SelectItem value="culinaria-indiana">Culinária Indiana</SelectItem>
                    <SelectItem value="culinaria-mediterranea">Culinária Mediterrânea</SelectItem>
                    <SelectItem value="confeitaria-internacional">Confeitaria Internacional</SelectItem>
                    <SelectItem value="mixologia">Mixologia & Drinks</SelectItem>
                    <SelectItem value="curso-completo">Curso Completo (Múltiplas Culinárias)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experienceLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nível de Experiência</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Qual seu nível?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="iniciante">Iniciante (Nunca cozinhei)</SelectItem>
                    <SelectItem value="basico">Básico (Cozinho em casa)</SelectItem>
                    <SelectItem value="intermediario">Intermediário (Tenho boa prática)</SelectItem>
                    <SelectItem value="avancado">Avançado (Busco aperfeiçoamento)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferredSchedule"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Horário Preferido</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Quando prefere as aulas?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="manha-semana">Manhã (Semana)</SelectItem>
                    <SelectItem value="tarde-semana">Tarde (Semana)</SelectItem>
                    <SelectItem value="noite-semana">Noite (Semana)</SelectItem>
                    <SelectItem value="sabado-manha">Sábado Manhã</SelectItem>
                    <SelectItem value="sabado-tarde">Sábado Tarde</SelectItem>
                    <SelectItem value="domingo-manha">Domingo Manhã</SelectItem>
                    <SelectItem value="domingo-tarde">Domingo Tarde</SelectItem>
                    <SelectItem value="flexivel">Flexível</SelectItem>
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
                <FormLabel>Mensagem Adicional (Opcional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Alguma dúvida ou pedido especial?"
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

export default CourseEnrollmentForm;
