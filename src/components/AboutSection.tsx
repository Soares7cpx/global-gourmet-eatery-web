import { Globe, Users, Award, Clock } from 'lucide-react';
import chefCookingImage from '@/assets/chef-cooking.jpg';
import internationalDishesImage from '@/assets/international-dishes.jpg';

const AboutSection = () => {
  const features = [
    {
      icon: Globe,
      title: 'Cozinha Internacional',
      description: 'Sabores autênticos de mais de 15 países, preparados por chefs especializados em cada culinária'
    },
    {
      icon: Users,
      title: 'Experiência Premium',
      description: 'Ambiente sofisticado e acolhedor com atendimento personalizado e menu degustação exclusivo'
    },
    {
      icon: Award,
      title: 'Premiados',
      description: 'Reconhecidos nacionalmente com prêmios de excelência gastronômica e melhor restaurante internacional'
    },
    {
      icon: Clock,
      title: 'Aulas de Chef',
      description: 'Aprenda com mestres da culinária em nossa escola certificada, do básico ao avançado'
    }
  ];

  return (
    <section id="about" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Nossa História
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Uma jornada gastronômica que começou há 15 anos com o sonho de unir culturas através da culinária
            </p>
          </div>

          {/* Story Section with Images */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Text Content */}
            <div className="space-y-6">
              <div>
                <h3 className="font-playfair text-3xl font-bold mb-4 text-foreground">
                  Do Sonho à Realidade
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  O Mundo Gastronômico nasceu da paixão de nossos fundadores por explorar diferentes culturas 
                  através da gastronomia. Após anos viajando pelo mundo e estudando com mestres culinários 
                  de diversos países, decidimos criar um espaço onde essas experiências pudessem ser 
                  compartilhadas com São Paulo.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Hoje, somos reconhecidos como um dos principais restaurantes de culinária internacional 
                  da cidade, oferecendo não apenas refeições memoráveis, mas também a oportunidade de 
                  aprender com nossos chefs através de aulas práticas e imersivas.
                </p>
              </div>
              
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                <h4 className="font-bold text-lg text-primary mb-3">Nossa Filosofia</h4>
                <p className="text-muted-foreground">
                  Acreditamos que a comida é a linguagem universal que une pessoas e culturas. 
                  Cada prato conta uma história, cada ingrediente carrega tradições milenares, 
                  e cada refeição é uma oportunidade de viajar sem sair do lugar.
                </p>
              </div>
            </div>

            {/* Images Grid */}
            <div className="grid grid-rows-2 gap-4">
              <div className="relative overflow-hidden rounded-lg shadow-2xl group">
                <img 
                  src={chefCookingImage} 
                  alt="Chef preparando pratos gourmet"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <p className="text-white font-semibold text-lg">Nossos Chefs Especialistas</p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-2xl group">
                <img 
                  src={internationalDishesImage} 
                  alt="Variedade de pratos internacionais"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <p className="text-white font-semibold text-lg">Sabores do Mundo</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 bg-background rounded-2xl p-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">15+</div>
              <p className="text-muted-foreground">Anos de Tradição</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">20+</div>
              <p className="text-muted-foreground">Países Representados</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">50k+</div>
              <p className="text-muted-foreground">Clientes Satisfeitos</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">500+</div>
              <p className="text-muted-foreground">Alunos Formados</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;