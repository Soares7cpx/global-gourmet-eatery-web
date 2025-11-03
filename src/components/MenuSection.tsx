import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedSection from '@/components/AnimatedSection';

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState('entradas');

  const categories = [
    { id: 'entradas', name: 'Entradas', flag: '🌍' },
    { id: 'principais', name: 'Pratos Principais', flag: '🍽️' },
    { id: 'sobremesas', name: 'Sobremesas', flag: '🍰' },
    { id: 'bebidas', name: 'Bebidas', flag: '🍷' }
  ];

  const menuItems = {
    entradas: [
      {
        name: 'Antipasto Italiano',
        description: 'Seleção de queijos, embutidos e azeitonas da Toscana',
        price: 'R$ 45',
        origin: '🇮🇹 Itália'
      },
      {
        name: 'Gyoza Japonês',
        description: 'Dumplings recheados com porco e legumes, molho ponzu',
        price: 'R$ 38',
        origin: '🇯🇵 Japão'
      },
      {
        name: 'Hummus Libanês',
        description: 'Pasta de grão-de-bico com tahine, azeite e pão pita',
        price: 'R$ 32',
        origin: '🇱🇧 Líbano'
      },
      {
        name: 'Bruschetta Caprese',
        description: 'Pão tostado com tomate, mozzarella fresca e manjericão',
        price: 'R$ 35',
        origin: '🇮🇹 Itália'
      },
      {
        name: 'Spring Rolls Vietnamitas',
        description: 'Rolinhos frescos com camarão, vegetais e molho agridoce',
        price: 'R$ 36',
        origin: '🇻🇳 Vietnã'
      },
      {
        name: 'Ceviche Peruano',
        description: 'Peixe fresco marinado em limão com cebola roxa e coentro',
        price: 'R$ 42',
        origin: '🇵🇪 Peru'
      }
    ],
    principais: [
      {
        name: 'Paella Valenciana',
        description: 'Arroz com frutos do mar, açafrão e pimentões',
        price: 'R$ 78',
        origin: '🇪🇸 Espanha'
      },
      {
        name: 'Butter Chicken',
        description: 'Frango ao curry com molho cremoso de tomate e especiarias',
        price: 'R$ 65',
        origin: '🇮🇳 Índia'
      },
      {
        name: 'Beef Bourguignon',
        description: 'Carne bovina cozida lentamente no vinho tinto francês',
        price: 'R$ 85',
        origin: '🇫🇷 França'
      },
      {
        name: 'Pad Thai',
        description: 'Macarrão de arroz com camarões, amendoim e tamarindo',
        price: 'R$ 58',
        origin: '🇹🇭 Tailândia'
      },
      {
        name: 'Moussaka Grega',
        description: 'Berinjela gratinada com carne moída e molho bechamel',
        price: 'R$ 68',
        origin: '🇬🇷 Grécia'
      },
      {
        name: 'Ramen Tonkotsu',
        description: 'Macarrão japonês em caldo de osso de porco com chashu',
        price: 'R$ 62',
        origin: '🇯🇵 Japão'
      }
    ],
    sobremesas: [
      {
        name: 'Tiramisu',
        description: 'Sobremesa italiana com café, mascarpone e cacau',
        price: 'R$ 28',
        origin: '🇮🇹 Itália'
      },
      {
        name: 'Baklava',
        description: 'Massa folhada com nozes e mel, tradição turca',
        price: 'R$ 25',
        origin: '🇹🇷 Turquia'
      },
      {
        name: 'Crème Brûlée',
        description: 'Creme francês com açúcar caramelizado',
        price: 'R$ 30',
        origin: '🇫🇷 França'
      },
      {
        name: 'Mochi Japonês',
        description: 'Bolinho de arroz macio recheado com pasta de feijão doce',
        price: 'R$ 24',
        origin: '🇯🇵 Japão'
      },
      {
        name: 'Churros Espanhóis',
        description: 'Massa frita crocante com açúcar, canela e chocolate quente',
        price: 'R$ 26',
        origin: '🇪🇸 Espanha'
      },
      {
        name: 'Pavlova Australiana',
        description: 'Merengue crocante com chantilly e frutas frescas',
        price: 'R$ 32',
        origin: '🇦🇺 Austrália'
      }
    ],
    bebidas: [
      {
        name: 'Sangria Espanhola',
        description: 'Vinho tinto com frutas frescas e especiarias',
        price: 'R$ 35',
        origin: '🇪🇸 Espanha'
      },
      {
        name: 'Caipirinha Premium',
        description: 'Cachaça artesanal com frutas tropicais',
        price: 'R$ 22',
        origin: '🇧🇷 Brasil'
      },
      {
        name: 'Chá Marroquino',
        description: 'Chá verde com hortelã fresca e açúcar',
        price: 'R$ 18',
        origin: '🇲🇦 Marrocos'
      },
      {
        name: 'Mojito Cubano',
        description: 'Rum branco, hortelã, limão e água com gás',
        price: 'R$ 28',
        origin: '🇨🇺 Cuba'
      },
      {
        name: 'Sake Premium',
        description: 'Bebida japonesa de arroz fermentado, servido quente ou frio',
        price: 'R$ 45',
        origin: '🇯🇵 Japão'
      },
      {
        name: 'Lassi Indiano',
        description: 'Bebida cremosa de iogurte com manga ou cardamomo',
        price: 'R$ 20',
        origin: '🇮🇳 Índia'
      }
    ]
  };

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-gradient">
                Cardápio Internacional
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore sabores autênticos de diferentes culturas, preparados com ingredientes frescos 
                e técnicas tradicionais por nossos chefs especializados
              </p>
            </div>
          </AnimatedSection>

          {/* Category Tabs */}
          <AnimatedSection animation="fade-in" delay={200}>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  activeCategory === category.id
                    ? 'bg-primary text-black shadow-lg scale-105'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                <span className="mr-2">{category.flag}</span>
                {category.name}
              </button>
            ))}
            </div>
          </AnimatedSection>

          {/* Menu Items */}
          <AnimatedSection animation="fade-up" delay={400}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems[activeCategory as keyof typeof menuItems]?.map((item, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 card-hover bg-card border-border animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-lg font-bold text-primary">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span className="bg-secondary px-3 py-1 rounded-full transition-colors group-hover:bg-primary/20">
                      {item.origin}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
