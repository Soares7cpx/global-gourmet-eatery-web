
import emailjs from '@emailjs/browser';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FormValues } from './FormSchema';

export const sendReservationEmail = async (data: FormValues) => {
  try {
    // Template parameters for EmailJS
    const templateParams = {
      to_name: data.name,
      to_email: data.email,
      restaurant_name: 'Mundo Gastronômico',
      date: format(data.date, 'PPP', { locale: ptBR }),
      time: data.time,
      guests: data.guests,
      phone: data.phone,
      occasion: data.occasion || 'Não especificado',
      special_requests: data.message || 'Nenhuma',
      restaurant_phone: '(11) 97834-5918',
      restaurant_email: 'reservas@mundogastronomico.com'
    };

    // IMPORTANTE: Substitua pelos seus dados reais do EmailJS
    // 1. Acesse: https://dashboard.emailjs.com/
    // 2. Crie uma conta e configure um serviço de email
    // 3. Crie um template com os campos acima
    // 4. Substitua os valores abaixo:
    
    const SERVICE_ID = 'SEU_SERVICE_ID_AQUI'; // Ex: 'service_abc123'
    const TEMPLATE_ID = 'SEU_TEMPLATE_ID_AQUI'; // Ex: 'template_xyz789'
    const PUBLIC_KEY = 'SUA_PUBLIC_KEY_AQUI'; // Ex: 'user_ABC123XYZ'

    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    console.log('Email de confirmação enviado com sucesso para:', data.email);
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    throw error;
  }
};
