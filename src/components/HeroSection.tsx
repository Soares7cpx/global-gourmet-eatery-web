
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChefHat, Star } from 'lucide-react';
import ReservationDialog from '@/components/ReservationDialog';

const HeroSection = () => {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=2000&q=80')`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="flex text-primary">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-current" />
              ))}
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Sabores do
            <span className="block text-gradient">Mundo</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            Uma experiência gastronômica única que leva você em uma viagem pelos continentes através de pratos autênticos e sofisticados
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="btn-gold text-lg px-8 py-4"
              onClick={() => setIsReservationOpen(true)}
            >
              <ChefHat className="mr-2 h-5 w-5" />
              Reservar Mesa
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-white border-white hover:bg-white hover:text-black text-lg px-8 py-4"
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
