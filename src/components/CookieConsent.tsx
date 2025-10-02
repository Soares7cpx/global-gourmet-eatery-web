import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show after 2 seconds
      setTimeout(() => setIsVisible(true), 2000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card border-t border-border shadow-2xl animate-slide-up">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <Cookie className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Cookies e Privacidade
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Utilizamos cookies para melhorar sua experiência em nosso site, personalizar conteúdo e analisar nosso tráfego. 
                De acordo com a LGPD, precisamos do seu consentimento para processar seus dados.{' '}
                <a href="#" className="text-primary hover:underline">
                  Saiba mais
                </a>
              </p>
            </div>
          </div>
          
          <div className="flex gap-3 flex-shrink-0">
            <Button
              variant="outline"
              onClick={declineCookies}
              className="text-sm"
            >
              Recusar
            </Button>
            <Button
              onClick={acceptCookies}
              className="bg-primary text-black hover:bg-primary/90 text-sm"
            >
              Aceitar Todos
            </Button>
          </div>

          <button
            onClick={declineCookies}
            className="absolute top-4 right-4 md:relative md:top-0 md:right-0 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
