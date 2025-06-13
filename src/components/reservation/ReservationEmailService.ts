
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

    // Configure EmailJS with your service ID, template ID, and public key
    // You'll need to replace these with your actual EmailJS credentials
    await emailjs.send(
      'service_reservation', // Service ID
      'template_reservation', // Template ID
      templateParams,
      'your_public_key' // Public Key
    );

    console.log('Email de confirmação enviado com sucesso');
  } catch (error) {
    console.error('Erro ao enviar email:', error);
  }
};
