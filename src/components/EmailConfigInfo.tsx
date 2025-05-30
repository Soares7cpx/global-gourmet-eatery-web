
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const EmailConfigInfo = () => {
  return (
    <Alert className="mb-4">
      <Info className="h-4 w-4" />
      <AlertDescription>
        <strong>Configuração de Email Necessária:</strong> Para que os emails sejam enviados automaticamente, 
        você precisa configurar o EmailJS com suas credenciais. Acesse{' '}
        <a 
          href="https://www.emailjs.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary underline"
        >
          emailjs.com
        </a>{' '}
        e substitua as credenciais nos arquivos ReservationForm.tsx e EventQuoteForm.tsx.
      </AlertDescription>
    </Alert>
  );
};

export default EmailConfigInfo;
