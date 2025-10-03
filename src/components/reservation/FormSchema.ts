
import { z } from 'zod';

export const formSchema = z.object({
  name: z.string()
    .min(3, { message: 'Nome deve ter pelo menos 3 caracteres' })
    .max(100, { message: 'Nome muito longo' })
    .trim(),
  email: z.string()
    .email({ message: 'Email inválido' })
    .max(255, { message: 'Email muito longo' })
    .trim(),
  phone: z.string()
    .min(10, { message: 'Telefone inválido' })
    .max(20, { message: 'Telefone inválido' })
    .regex(/^[\d\s()-+]+$/, { message: 'Telefone deve conter apenas números e símbolos válidos' })
    .trim(),
  date: z.date({ required_error: 'Selecione uma data' }),
  time: z.string({ required_error: 'Selecione um horário' }),
  guests: z.string({ required_error: 'Selecione o número de pessoas' }),
  occasion: z.string()
    .max(100, { message: 'Ocasião muito longa' })
    .optional()
    .transform(val => val?.trim() || undefined),
  message: z.string()
    .max(1000, { message: 'Mensagem muito longa' })
    .optional()
    .transform(val => val?.trim() || undefined),
});

export type FormValues = z.infer<typeof formSchema>;
