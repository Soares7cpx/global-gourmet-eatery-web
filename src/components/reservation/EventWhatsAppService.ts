
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface EventFormValues {
  name: string;
  email: string;
  phone: string;
  company?: string;
  eventType: string;
  date: Date;
  guests: string;
  budget?: string;
  requirements?: string;
}

export const sendEventQuoteWhatsApp = (data: EventFormValues) => {
  const phoneNumber = '5511978345918'; // Número do WhatsApp do restaurante (com código do país)
  
  const message = `
🎉 *SOLICITAÇÃO DE ORÇAMENTO - MUNDO GASTRONÔMICO*

📋 *Dados do Evento:*
• Nome: ${data.name}
• Email: ${data.email}
• Telefone: ${data.phone}
• Empresa: ${data.company || 'Não informado'}
• Tipo de Evento: ${data.eventType}
• Data do Evento: ${format(data.date, 'PPP', { locale: ptBR })}
• Número de Convidados: ${data.guests}
• Orçamento Estimado: ${data.budget || 'Não especificado'}
• Requisitos Especiais: ${data.requirements || 'Nenhum'}

Aguardo retorno com o orçamento! 😊
  `.trim();

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  // Abre o WhatsApp em uma nova aba
  window.open(whatsappUrl, '_blank');
  
  console.log('Abrindo WhatsApp para solicitar orçamento');
};
