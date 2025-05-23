
const GallerySection = () => {
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=500&q=80',
      alt: 'Prato gourmet internacional',
      title: 'Culinária Artesanal'
    },
    {
      src: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=500&q=80',
      alt: 'Ambiente sofisticado',
      title: 'Ambiente Elegante'
    },
    {
      src: 'https://images.unsplash.com/photo-1498936178812-4b2e558d2937?auto=format&fit=crop&w=500&q=80',
      alt: 'Ingredientes frescos',
      title: 'Ingredientes Premium'
    },
    {
      src: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=500&q=80',
      alt: 'Mesa preparada',
      title: 'Experiência Única'
    },
    {
      src: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=500&q=80',
      alt: 'Chef preparando',
      title: 'Mestres da Culinária'
    },
    {
      src: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=500&q=80',
      alt: 'Vinhos selecionados',
      title: 'Carta de Vinhos'
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
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
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold">{image.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-lg text-muted-foreground mb-6">
              Venha vivenciar essa experiência gastronômica única
            </p>
            <button className="btn-gold">
              Reservar sua Mesa
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
