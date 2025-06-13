
import { Star, Quote } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Maria Silva',
      role: 'Empresária',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b607?auto=format&fit=crop&w=150&q=80',
      text: 'As aulas de culinária internacional mudaram completamente minha forma de cozinhar. Aprendi técnicas incríveis e sabores únicos!',
      rating: 5
    },
    {
      name: 'João Santos',
      role: 'Chef Amador',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      text: 'O evento privado que organizamos foi perfeito. Todos os convidados ficaram impressionados com a qualidade dos pratos.',
      rating: 5
    },
    {
      name: 'Ana Costa',
      role: 'Nutricionista',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
      text: 'Experiência gastronômica única! Aprendi sobre ingredientes de diferentes culturas e como combiná-los de forma saudável.',
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              O Que Dizem Nossos Alunos
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transformamos vidas através da culinária. Veja os depoimentos de quem já vivenciou 
              nossas experiências gastronômicas
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 shadow-lg card-hover border border-border"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-primary fill-current" />
                  ))}
                </div>
                
                <Quote className="h-8 w-8 text-primary mb-4 opacity-50" />
                
                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center">
                  <OptimizedImage
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                    width={48}
                    height={48}
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-lg text-muted-foreground mb-6">
              Junte-se a centenas de alunos satisfeitos
            </p>
            <button className="btn-gold">
              Comece Sua Jornada Gastronômica
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
