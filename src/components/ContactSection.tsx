
import { useState } from 'react';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import ReservationDialog from '@/components/ReservationDialog';
import EventQuoteDialog from '@/components/EventQuoteDialog';

const ContactSection = () => {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isEventQuoteOpen, setIsEventQuoteOpen] = useState(false);
  
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Localização',
      details: ['Rua Gourmet, 123', 'Jardins, São Paulo - SP', 'CEP: 01234-567']
    },
    {
      icon: Phone,
      title: 'Telefones',
      details: ['(11) 97834-5918', 'WhatsApp disponível']
    },
    {
      icon: Clock,
      title: 'Funcionamento',
      details: ['Seg a Dom: 14h às 22h', 'Reservas até 21h30']
    },
    {
      icon: Mail,
      title: 'E-mail',
      details: ['contato@mundogastronomico.com', 'reservas@mundogastronomico.com', 'eventos@mundogastronomico.com']
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Entre em Contato
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Estamos prontos para proporcionar uma experiência gastronômica inesquecível. 
              Entre em contato para reservas, eventos especiais ou qualquer informação
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center group hover:shadow-xl transition-all duration-300 card-hover bg-card border-border">
                <CardContent className="p-6">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <info.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">
                    {info.title}
                  </h3>
                  <div className="space-y-2">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-muted-foreground text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Services Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Reservations */}
            <div>
              <h3 className="text-3xl font-bold mb-6 text-foreground">
                Faça sua Reserva
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Para garantir a melhor experiência, recomendamos reservas antecipadas. 
                Nossa equipe está preparada para atender grupos de todos os tamanhos.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Reservas online disponíveis 24h</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Menu degustação personalizado</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Sommelier para harmonização</span>
                </div>
              </div>

              <button 
                className="btn-gold w-full"
                onClick={() => setIsReservationOpen(true)}
              >
                Reservar Mesa Online
              </button>
            </div>

            {/* Events */}
            <div>
              <h3 className="text-3xl font-bold mb-6 text-foreground">
                Eventos Especiais
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Transformamos seus eventos em experiências gastronômicas únicas. 
                Desde jantares íntimos até grandes celebrações corporativas.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Casamentos e celebrações</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Eventos corporativos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Cardápio personalizado</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Serviço completo de catering</span>
                </div>
              </div>

              <button 
                className="w-full bg-secondary text-foreground hover:bg-secondary/80 font-medium px-6 py-3 rounded-lg transition-all duration-300"
                onClick={() => setIsEventQuoteOpen(true)}
              >
                Solicitar Orçamento para Eventos
              </button>
            </div>
          </div>

          {/* Map Section */}
          <div className="relative">
            <div className="bg-secondary/30 rounded-lg p-8 text-center">
              <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2 text-foreground">
                Localização Privilegiada
              </h4>
              <p className="text-muted-foreground mb-4">
                Situado no coração dos Jardins, oferecemos fácil acesso e estacionamento 
                para uma experiência completa
              </p>
              <button className="bg-primary text-black font-medium px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Ver no Mapa
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <ReservationDialog 
        open={isReservationOpen}
        onOpenChange={setIsReservationOpen}
      />
      
      <EventQuoteDialog 
        open={isEventQuoteOpen}
        onOpenChange={setIsEventQuoteOpen}
      />
    </section>
  );
};

export default ContactSection;
