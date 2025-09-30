
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { useState } from 'react';
import TourRequestDialog from './TourRequestDialog';

const LocationSection = () => {
  const [isTourRequestOpen, setIsTourRequestOpen] = useState(false);
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Nossa Localização
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Estamos no coração de São Paulo, nos Jardins, oferecendo fácil acesso 
              para suas aulas de culinária internacional
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
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
                      Rua Gourmet, 123<br />
                      Jardins, São Paulo - SP<br />
                      CEP: 01234-567
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
                      <p>Segunda a Sexta: 09:00 - 22:00</p>
                      <p>Sábado e Domingo: 10:00 - 20:00</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Navigation className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Como Chegar</h4>
                    <p className="text-muted-foreground mb-3">
                      Localizado no coração dos Jardins, próximo ao metrô Trianon-MASP.
                      Estacionamento conveniado disponível.
                    </p>
                    <button 
                      className="text-primary hover:text-primary/80 transition-colors font-medium"
                      onClick={() => window.open('https://www.google.com/maps/search/Rua+Gourmet,+123+Jardins+São+Paulo', '_blank')}
                    >
                      Ver no Google Maps →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative">
              <div className="bg-secondary/30 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    Mundo Gastronômico
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    Jardins, São Paulo - SP
                  </p>
                  <button 
                    className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                    onClick={() => window.open('https://www.google.com/maps/search/Rua+Gourmet,+123+Jardins+São+Paulo', '_blank')}
                  >
                    Abrir no Google Maps
                  </button>
                </div>
              </div>
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
