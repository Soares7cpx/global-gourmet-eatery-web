import { useState } from 'react';
import { Mail, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const emailSchema = z.string().email({ message: 'Email inválido' });

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const validation = emailSchema.safeParse(email);
    if (!validation.success) {
      toast({
        title: 'Email inválido',
        description: 'Por favor, insira um email válido.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // For now, just simulate success. Later we'll integrate with a backend service
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubscribed(true);
      setEmail('');
      
      toast({
        title: 'Inscrição confirmada!',
        description: 'Você receberá nossas novidades em breve.',
      });

      // Reset after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    } catch (error) {
      toast({
        title: 'Erro ao inscrever',
        description: 'Tente novamente mais tarde.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-gradient">
                Receba Novidades e Receitas
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Inscreva-se em nossa newsletter e receba dicas culinárias exclusivas, 
                receitas internacionais e descontos especiais em aulas
              </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Seu melhor email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading || isSubscribed}
                  className="flex-1 h-12 px-4 text-base"
                  required
                  aria-label="Email para newsletter"
                />
                <Button
                  type="submit"
                  disabled={isLoading || isSubscribed}
                  className="h-12 px-8 bg-primary text-black hover:bg-primary/90 font-semibold"
                >
                  {isSubscribed ? (
                    <>
                      <Check className="h-5 w-5 mr-2" />
                      Inscrito!
                    </>
                  ) : isLoading ? (
                    'Inscrevendo...'
                  ) : (
                    'Inscrever'
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-4">
                Ao se inscrever, você concorda em receber emails do Mundo Gastronômico. 
                Você pode cancelar a qualquer momento.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
