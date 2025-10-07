import { useState } from 'react';
import OptimizedImage from '@/components/OptimizedImage';
import ReservationDialog from '@/components/ReservationDialog';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import restaurantAmbianceImage from '@/assets/restaurant-ambiance.jpg';
import cookingClassImage from '@/assets/cooking-class.jpg';
import chefCookingImage from '@/assets/chef-cooking.jpg';
import internationalDishesImage from '@/assets/international-dishes.jpg';
import appetizersImage from '@/assets/appetizers.jpg';

const GallerySection = () => {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  const images = [
    {
      src: restaurantAmbianceImage,
      alt: 'Ambiente acolhedor do restaurante com clientes',
      title: 'Atmosfera Única',
      description: 'Ambiente sofisticado e acolhedor para momentos especiais'
    },
    {
      src: cookingClassImage,
      alt: 'Aula de culinária com chef e alunos',
      title: 'Aulas Práticas',
      description: 'Aprenda com chefs especializados em turmas exclusivas'
    },
    {
      src: chefCookingImage,
      alt: 'Chef preparando pratos gourmet',
      title: 'Mestres da Culinária',
      description: 'Chefs internacionais com anos de experiência'
    },
    {
      src: internationalDishesImage,
      alt: 'Variedade de pratos internacionais',
      title: 'Sabores Autênticos',
      description: 'Pratos preparados com receitas tradicionais e ingredientes premium'
    },
    {
      src: appetizersImage,
      alt: 'Entradas gourmet variadas',
      title: 'Entradas Artísticas',
      description: 'Apresentação impecável em cada detalhe'
    },
    {
      src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
      alt: 'Mesa elegante do restaurante',
      title: 'Experiência Completa',
      description: 'Do ambiente aos pratos, cada detalhe pensado para você'
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                <Camera className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Galeria de Experiências
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Descubra nosso ambiente, pratos e momentos especiais que tornam cada visita inesquecível
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 card-hover"
              >
                <OptimizedImage
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {image.title}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {image.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-12 border border-primary/20">
            <h3 className="text-3xl font-bold mb-4 text-foreground">
              Pronto para Sua Experiência Gastronômica?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
              Reserve sua mesa e descubra por que somos o destino favorito dos amantes de boa comida em São Paulo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="btn-gold text-lg px-8"
                onClick={() => setIsReservationOpen(true)}
              >
                Reservar Mesa Agora
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-foreground border-2 text-lg px-8"
                onClick={() => {
                  document.getElementById('classes')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Ver Aulas Disponíveis
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ReservationDialog 
        open={isReservationOpen}
        onOpenChange={setIsReservationOpen}
      />
    </section>
  );
};

export default GallerySection;