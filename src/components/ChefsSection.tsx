import { ChefHat, Award, Users } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const ChefsSection = () => {
  const chefs = [
    {
      name: 'Chef Marcos Soares',
      role: 'Especialista em Culinária Italiana',
      description: 'Fundador do projeto e especialista em culinária italiana, Chef Marcos traz anos de experiência e paixão por ensinar.',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80',
      expertise: ['Massas Artesanais', 'Molhos Clássicos', 'Risottos']
    },
    {
      name: 'Chef Ana Ribeiro',
      role: 'Confeiteira e Professora',
      description: 'Especialista em técnicas francesas de confeitaria, Chef Ana encanta com suas criações delicadas e saborosas.',
      image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&w=400&q=80',
      expertise: ['Pâtisserie Francesa', 'Macarons', 'Sobremesas']
    },
    {
      name: 'Equipe Mundo Gastronômico',
      role: 'Profissionais Apaixonados',
      description: 'Nossa equipe é formada por profissionais dedicados a compartilhar conhecimento e criar experiências gastronômicas únicas.',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=80',
      expertise: ['Culinária Internacional', 'Técnicas Avançadas', 'Ensino']
    }
  ];

  return (
    <section id="chefs" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                <ChefHat className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Nossos Chefs
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Conheça quem dá sabor às nossas experiências gastronômicas
            </p>
          </div>

          {/* Chefs Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chefs.map((chef, index) => (
              <div
                key={index}
                className="bg-card rounded-lg overflow-hidden shadow-lg card-hover group"
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <OptimizedImage
                    src={chef.image}
                    alt={chef.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {chef.name}
                    </h3>
                    <p className="text-primary text-sm font-medium">
                      {chef.role}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {chef.description}
                  </p>
                  
                  {/* Expertise Tags */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-foreground mb-2">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Especialidades:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {chef.expertise.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium border border-primary/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-16 bg-background rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-gradient mb-2">10+</div>
                <p className="text-muted-foreground">Chefs Especializados</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-gradient mb-2">50+</div>
                <p className="text-muted-foreground">Prêmios Conquistados</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <ChefHat className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-gradient mb-2">500+</div>
                <p className="text-muted-foreground">Alunos Formados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChefsSection;
