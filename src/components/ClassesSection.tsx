import { useState } from 'react';
import { Calendar, Clock, Users, ChefHat } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CourseEnrollmentDialog from '@/components/CourseEnrollmentDialog';

const ClassesSection = () => {
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);

  const classes = [
    {
      title: 'Massas Italianas Artesanais',
      description: 'Aprenda a fazer massa fresca do zero: fettuccine, ravioli e gnocchi',
      duration: '3 horas',
      difficulty: 'Iniciante',
      maxStudents: 12,
      price: 'R$ 280',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80',
      nextDates: ['15 Jan', '22 Jan', '29 Jan']
    },
    {
      title: 'Sushi & Sashimi Japonês',
      description: 'Técnicas tradicionais de preparo de arroz, cortes de peixe e montagem',
      duration: '4 horas',
      difficulty: 'Intermediário',
      maxStudents: 10,
      price: 'R$ 350',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=800&q=80',
      nextDates: ['18 Jan', '25 Jan', '01 Fev']
    },
    {
      title: 'Confeitaria Francesa',
      description: 'Macarons, croissants e éclairs com técnicas clássicas francesas',
      duration: '5 horas',
      difficulty: 'Avançado',
      maxStudents: 8,
      price: 'R$ 420',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      nextDates: ['20 Jan', '27 Jan', '03 Fev']
    },
    {
      title: 'Culinária Tailandesa',
      description: 'Curry, pad thai e primaveras com ingredientes e especiarias autênticas',
      duration: '3.5 horas',
      difficulty: 'Iniciante',
      maxStudents: 12,
      price: 'R$ 295',
      image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=800&q=80',
      nextDates: ['16 Jan', '23 Jan', '30 Jan']
    },
    {
      title: 'Churrasco Brasileiro Gourmet',
      description: 'Cortes nobres, marinadas e técnicas de grelha para o churrasco perfeito',
      duration: '4 horas',
      difficulty: 'Intermediário',
      maxStudents: 15,
      price: 'R$ 320',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
      nextDates: ['21 Jan', '28 Jan', '04 Fev']
    },
    {
      title: 'Pães Artesanais',
      description: 'Sourdough, baguetes e pães especiais com fermentação natural',
      duration: '6 horas',
      difficulty: 'Intermediário',
      maxStudents: 10,
      price: 'R$ 380',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      nextDates: ['19 Jan', '26 Jan', '02 Fev']
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante':
        return 'bg-green-500/10 text-green-700 dark:text-green-400';
      case 'Intermediário':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
      case 'Avançado':
        return 'bg-red-500/10 text-red-700 dark:text-red-400';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <section id="classes" className="py-20 bg-background">
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
              Aulas de Culinária Internacional
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Aprenda com chefs especializados em suas próprias cozinhas. 
              Turmas pequenas, ingredientes premium e certificado ao final
            </p>
          </div>

          {/* Classes Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classes.map((classItem, index) => (
              <Card 
                key={index} 
                className="group overflow-hidden hover:shadow-2xl transition-all duration-300 card-hover"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={classItem.image} 
                    alt={classItem.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={getDifficultyColor(classItem.difficulty)}>
                      {classItem.difficulty}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {classItem.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {classItem.description}
                  </p>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{classItem.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4 text-primary" />
                      <span>Até {classItem.maxStudents}</span>
                    </div>
                  </div>

                  {/* Next Dates */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="font-medium">Próximas turmas:</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {classItem.nextDates.map((date, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {date}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-2xl font-bold text-primary">
                      {classItem.price}
                    </span>
                    <button
                      onClick={() => setIsEnrollmentOpen(true)}
                      className="bg-primary text-black px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
                    >
                      Inscrever-se
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center bg-secondary rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Não encontrou a aula ideal?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Oferecemos aulas particulares e workshops personalizados para grupos. 
              Entre em contato para criar uma experiência única!
            </p>
            <a 
              href="#contact"
              className="inline-block bg-primary text-black font-medium px-8 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
            >
              Solicitar Aula Personalizada
            </a>
          </div>
        </div>
      </div>

      {/* Enrollment Dialog */}
      <CourseEnrollmentDialog 
        open={isEnrollmentOpen}
        onOpenChange={setIsEnrollmentOpen}
      />
    </section>
  );
};

export default ClassesSection;
