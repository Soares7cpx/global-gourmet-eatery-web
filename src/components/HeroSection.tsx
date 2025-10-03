
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChefHat, Star } from 'lucide-react';
import ReservationDialog from '@/components/ReservationDialog';

const HeroSection = () => {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-100 ease-out"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=2000&q=80')`,
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      />
      
      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="animate-fade-in">
          <div className="flex items-center justify-center mb-6 animate-scale-in">
            <div className="flex text-primary drop-shadow-lg">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
          </div>
          
          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl">
            Sabores do
            <span className="block text-gradient">Mundo</span>
          </h1>
          
          <p className="font-inter text-xl md:text-2xl text-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            Uma experiência gastronômica única que leva você em uma viagem pelos continentes através de pratos autênticos e sofisticados
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="btn-gold text-lg px-8 py-4 shadow-2xl hover:shadow-primary/50 transition-all duration-300"
              onClick={() => setIsReservationOpen(true)}
            >
              <ChefHat className="mr-2 h-5 w-5" />
              Reservar Mesa
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-foreground border-2 border-border hover:bg-accent hover:text-accent-foreground text-lg px-8 py-4 backdrop-blur-sm bg-background/10 transition-all duration-300"
              onClick={() => {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Nossa História
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Reservation Dialog/Drawer */}
      <ReservationDialog 
        open={isReservationOpen}
        onOpenChange={setIsReservationOpen}
      />
    </section>
  );
};

export default HeroSection;
