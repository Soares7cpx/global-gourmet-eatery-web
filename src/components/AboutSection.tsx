
import { Globe, Users, Award, Clock } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: Globe,
      title: 'Culinária Mundial',
      description: 'Pratos autênticos de mais de 15 países diferentes'
    },
    {
      icon: Users,
      title: 'Chefs Especializados',
      description: 'Equipe internacional com experiência gastronômica única'
    },
    {
      icon: Award,
      title: 'Premiado',
      description: 'Reconhecido pelos melhores guias gastronômicos'
    },
    {
      icon: Clock,
      title: 'Tradição',
      description: 'Mais de 20 anos servindo experiências inesquecíveis'
    }
  ];

  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Nossa Paixão pela Gastronomia
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Há mais de duas décadas, o Mundo Gastronômico se dedica a proporcionar uma experiência culinária 
              que transcende fronteiras, unindo tradições e sabores de todos os continentes em um ambiente 
              sofisticado e acolhedor.
            </p>
          </div>

          {/* Story */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h3 className="font-playfair text-3xl font-bold text-foreground">
                Uma Jornada Gastronômica Global
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Nosso conceito nasceu da paixão por descobrir e compartilhar os sabores mais autênticos 
                do mundo. Cada prato em nosso cardápio conta uma história, carrega tradições e 
                representa a riqueza cultural de diferentes povos.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Trabalhamos com ingredientes selecionados e técnicas tradicionais, adaptadas ao 
                paladar contemporâneo, criando uma experiência gastronômica única que celebra 
                a diversidade e a excelência culinária mundial.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=600&q=80"
                alt="Interior do restaurante"
                className="rounded-lg shadow-2xl card-hover"
              />
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-foreground">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
