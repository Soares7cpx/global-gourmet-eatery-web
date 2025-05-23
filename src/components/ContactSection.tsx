
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ContactSection = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Localização',
      details: ['Rua Gourmet, 123', 'Jardins, São Paulo - SP', 'CEP: 01234-567']
    },
    {
      icon: Phone,
      title: 'Telefones',
      details: ['(11) 3456-7890', '(11) 99876-5432', 'WhatsApp disponível']
    },
    {
      icon: Clock,
      title: 'Funcionamento',
      details: ['Seg a Qui: 18h às 00h', 'Sex a Sáb: 18h às 02h', 'Dom: 18h às 23h']
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

          {/* Map and Reservation Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-foreground">
                Faça sua Reserva
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Para garantir a melhor experiência, recomendamos reservas antecipadas. 
                Nossa equipe está preparada para atender grupos de todos os tamanhos e 
                ocasiões especiais.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Reservas online disponíveis 24h</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Eventos e celebrações especiais</span>
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

              <div className="mt-8 space-y-4">
                <button className="btn-gold w-full">
                  Reservar Mesa Online
                </button>
                <button className="w-full bg-secondary text-foreground hover:bg-secondary/80 font-medium px-6 py-3 rounded-lg transition-all duration-300">
                  Solicitar Orçamento para Eventos
                </button>
              </div>
            </div>

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
      </div>
    </section>
  );
};

export default ContactSection;
