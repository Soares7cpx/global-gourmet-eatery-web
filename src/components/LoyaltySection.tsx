import { useState, useEffect } from 'react';
import { Gift, Star, TrendingUp, Award } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const LoyaltySection = () => {
  const { user } = useAuth();
  const [totalPoints, setTotalPoints] = useState(0);
  const [history, setHistory] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) fetchPoints();
  }, [user]);

  const fetchPoints = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('loyalty_points')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (data) {
      setHistory(data);
      const total = data.reduce((sum, item) => sum + item.points, 0);
      setTotalPoints(total);
    }
  };

  const getTier = (points: number) => {
    if (points >= 1000) return { name: 'Ouro', icon: Award, color: 'text-yellow-500' };
    if (points >= 500) return { name: 'Prata', icon: Star, color: 'text-gray-400' };
    return { name: 'Bronze', icon: TrendingUp, color: 'text-amber-700' };
  };

  if (!user) {
    return (
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <Gift className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="font-playfair text-3xl font-bold text-gradient mb-4">
            Programa de Fidelidade
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Ganhe pontos a cada pedido e troque por descontos exclusivos! Faça login para participar.
          </p>
          <Button className="btn-gold" onClick={() => navigate('/auth')}>
            Entrar e Participar
          </Button>
        </div>
      </section>
    );
  }

  const tier = getTier(totalPoints);
  const TierIcon = tier.icon;

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Gift className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="font-playfair text-3xl font-bold text-gradient mb-2">
            Programa de Fidelidade
          </h2>
          <p className="text-muted-foreground">Ganhe pontos a cada pedido!</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-primary/20 bg-card/80 backdrop-blur mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Seus Pontos</p>
                  <p className="text-4xl font-bold text-primary">{totalPoints}</p>
                </div>
                <div className="text-center">
                  <TierIcon className={`h-10 w-10 mx-auto ${tier.color}`} />
                  <Badge className="mt-2 bg-primary/20 text-primary border-primary/30">
                    Nível {tier.name}
                  </Badge>
                </div>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>💡 A cada R$ 1 gasto = 1 ponto. 100 pontos = R$ 10 de desconto!</p>
              </div>
            </CardContent>
          </Card>

          {history.length > 0 && (
            <Card className="border-border/50 bg-card/50">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Histórico Recente</h3>
                <div className="space-y-2">
                  {history.slice(0, 5).map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm py-1 border-b border-border/30 last:border-0">
                      <span className="text-muted-foreground">{item.description || item.transaction_type}</span>
                      <span className={item.points > 0 ? 'text-green-500' : 'text-destructive'}>
                        {item.points > 0 ? '+' : ''}{item.points} pts
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default LoyaltySection;
