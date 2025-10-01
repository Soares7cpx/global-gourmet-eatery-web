
import OptimizedImage from './OptimizedImage';
import { useState } from 'react';
import ReservationDialog from './ReservationDialog';

const GallerySection = () => {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=500&q=80',
      alt: 'Prato gourmet internacional - Culinária artesanal',
      title: 'Culinária Artesanal',
      description: 'Técnicas refinadas de diferentes culturas'
    },
    {
      src: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=500&q=80',
      alt: 'Ambiente sofisticado para aulas de culinária',
      title: 'Ambiente Elegante',
      description: 'Espaço profissional para aprendizado'
    },
    {
      src: 'https://images.unsplash.com/photo-1498936178812-4b2e558d2937?auto=format&fit=crop&w=500&q=80',
      alt: 'Ingredientes frescos e premium',
      title: 'Ingredientes Premium',
      description: 'Seleção cuidadosa dos melhores produtos'
    },
    {
      src: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=500&q=80',
      alt: 'Mesa preparada para evento gastronômico',
      title: 'Experiência Única',
      description: 'Eventos personalizados e memoráveis'
    },
    {
      src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=500&q=80',
      alt: 'Chef preparando pratos internacionais',
      title: 'Mestres da Culinária',
      description: 'Chefs especializados em cozinhas do mundo'
    },
    {
      src: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=500&q=80',
      alt: 'Seleção de vinhos para harmonização',
      title: 'Carta de Vinhos',
      description: 'Harmonização perfeita para cada prato'
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Galeria de Sabores
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Cada prato é uma obra de arte culinária, preparada com paixão e apresentada 
              com elegância para despertar todos os seus sentidos
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-lg card-hover cursor-pointer"
              >
                <OptimizedImage
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  width={500}
                  height={256}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold mb-1">{image.title}</h3>
                    <p className="text-sm text-gray-200">{image.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-lg text-muted-foreground mb-6">
              Venha vivenciar essa experiência gastronômica única em São Paulo
            </p>
            <button 
              className="btn-gold"
              onClick={() => setIsReservationOpen(true)}
            >
              Reservar sua Mesa
            </button>
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
