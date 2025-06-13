
import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  phone: z.string().min(8, { message: 'Telefone inválido' }),
  date: z.date({ required_error: 'Selecione uma data' }),
  time: z.string({ required_error: 'Selecione um horário' }),
  guests: z.string({ required_error: 'Selecione o número de pessoas' }),
  occasion: z.string().optional(),
  message: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;
