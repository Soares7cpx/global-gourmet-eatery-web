
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FormValues } from './FormSchema';

export const sendReservationWhatsApp = (data: FormValues) => {
  const phoneNumber = '5511978345918'; // Número do WhatsApp do restaurante (com código do país)
  
  const message = `
🍽️ *RESERVA DE MESA - MUNDO GASTRONÔMICO*

📋 *Dados da Reserva:*
• Nome: ${data.name}
• E-mail: ${data.email}
• Telefone: ${data.phone}
• Data: ${format(data.date, 'PPP', { locale: ptBR })}
• Horário: ${data.time}
• Número de pessoas: ${data.guests}
• Ocasião: ${data.occasion || 'Não especificado'}
• Observações: ${data.message || 'Nenhuma'}

Aguardo confirmação da disponibilidade! 😊
  `.trim();

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  // Abre o WhatsApp em uma nova aba
  window.open(whatsappUrl, '_blank');
  
  console.log('Abrindo WhatsApp para enviar reserva');
};
