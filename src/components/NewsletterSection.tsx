import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

const emailSchema = z.string().email('Por favor, insira um e-mail válido');

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const validation = emailSchema.safeParse(email);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email: email.toLowerCase().trim() }]);

      if (error) {
        if (error.code === '23505') {
          toast.error('Este e-mail já está cadastrado!');
        } else {
          throw error;
        }
      } else {
        setIsSubscribed(true);
        setEmail('');
        toast.success('Inscrição realizada com sucesso!', {
          description: 'Você receberá nossas novidades e receitas exclusivas.',
        });
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error('Erro ao realizar inscrição. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-secondary to-background">
      <div className="container mx-auto max-w-3xl text-center">
        <Mail className="h-12 w-12 text-primary mx-auto mb-6" />
        <h2 className="text-4xl md:text-5xl font-playfair mb-4 text-foreground">
          Receitas e Novidades Exclusivas
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Receba dicas de chefs, receitas internacionais e ofertas especiais diretamente no seu e-mail
        </p>

        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 text-base"
              disabled={isLoading}
              required
              aria-label="E-mail para newsletter"
            />
            <Button 
              type="submit" 
              size="lg"
              disabled={isLoading}
              className="h-12 px-8"
              aria-label={isLoading ? 'Inscrevendo...' : 'Inscrever na newsletter'}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Inscrevendo...
                </>
              ) : (
                'Inscrever-se'
              )}
            </Button>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-2 text-primary animate-fade-in">
            <CheckCircle2 className="h-6 w-6" />
            <p className="text-lg font-medium">Inscrição confirmada! Obrigado por se juntar a nós.</p>
          </div>
        )}

        <p className="text-sm text-muted-foreground mt-6">
          Respeitamos sua privacidade. Cancele a inscrição a qualquer momento.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
