
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { useState } from 'react';
import TourRequestDialog from './TourRequestDialog';
import GoogleMap from './GoogleMap';

const LocationSection = () => {
  const [isTourRequestOpen, setIsTourRequestOpen] = useState(false);
  return (
    <section id="location" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Nossa Localização
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Estamos localizados no coração de São Paulo, em um espaço moderno e acolhedor, 
              perfeito para aulas, eventos e experiências gastronômicas
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Informações de Contato
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Endereço</h4>
                    <p className="text-muted-foreground">
                      Rua das Flores, 123<br />
                      São Paulo - SP
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Telefone</h4>
                    <a 
                      href="tel:+5511978345918" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      (11) 97834-5918
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Horário de Funcionamento</h4>
                    <div className="text-muted-foreground space-y-1">
                      <p className="font-medium">Segunda a Sexta: 10h às 22h</p>
                      <p className="font-medium">Sábado: 11h às 23h</p>
                      <p className="font-medium">Domingo: Fechado</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Navigation className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Como Chegar</h4>
                    <p className="text-muted-foreground mb-3">
                      Venha nos visitar e descubra um novo sabor em cada detalhe!
                      Estacionamento disponível nas proximidades.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div>
              <GoogleMap />
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16 bg-secondary/20 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Visite Nosso Espaço Gastronômico
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Conheça nossa cozinha profissional, equipada com os melhores utensílios 
              para suas aulas de culinária internacional em São Paulo
            </p>
            <button 
              className="btn-gold"
              onClick={() => setIsTourRequestOpen(true)}
            >
              Agendar Visita
            </button>
          </div>
        </div>
      </div>

      <TourRequestDialog 
        open={isTourRequestOpen}
        onOpenChange={setIsTourRequestOpen}
      />
    </section>
  );
};

export default LocationSection;
