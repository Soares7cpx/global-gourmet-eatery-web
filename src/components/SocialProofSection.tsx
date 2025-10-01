import { Award, Users, Star, TrendingUp } from 'lucide-react';

const SocialProofSection = () => {
  const stats = [
    {
      icon: Users,
      value: '10.000+',
      label: 'Clientes Satisfeitos',
      color: 'text-primary'
    },
    {
      icon: Star,
      value: '4.9',
      label: 'Avaliação Média',
      color: 'text-primary'
    },
    {
      icon: Award,
      value: '15+',
      label: 'Prêmios Conquistados',
      color: 'text-primary'
    },
    {
      icon: TrendingUp,
      value: '20+',
      label: 'Anos de Experiência',
      color: 'text-primary'
    }
  ];

  const badges = [
    {
      name: 'TripAdvisor',
      image: 'https://images.unsplash.com/photo-1559526324-c1f275fbfa32?auto=format&fit=crop&w=80&q=80',
      rating: 'Certificado de Excelência'
    },
    {
      name: 'Veja São Paulo',
      image: 'https://images.unsplash.com/photo-1559526324-c1f275fbfa32?auto=format&fit=crop&w=80&q=80',
      rating: 'Melhor da Cidade'
    },
    {
      name: 'Michelin Guide',
      image: 'https://images.unsplash.com/photo-1559526324-c1f275fbfa32?auto=format&fit=crop&w=80&q=80',
      rating: 'Recomendado'
    }
  ];

  return (
    <section className="py-16 bg-secondary/20 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3 group-hover:bg-primary/20 transition-colors">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Badges */}
          <div className="border-t border-border pt-8">
            <p className="text-center text-sm text-muted-foreground mb-6">
              Reconhecido por:
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className="text-center opacity-70 hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="text-sm font-semibold text-foreground mb-1">
                    {badge.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {badge.rating}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
