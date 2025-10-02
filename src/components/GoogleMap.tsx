import { MapPin } from 'lucide-react';

const GoogleMap = () => {
  const address = "Rua Gourmet, 123, Jardins, São Paulo - SP";
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1972992992!2d-46.6739!3d-23.5629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzQ2LjQiUyA0NsKwNDAnMjYuMCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890";

  return (
    <div className="relative">
      <div className="bg-secondary/30 rounded-lg overflow-hidden">
        {/* Map Embed */}
        <div className="relative w-full h-[400px] md:h-[500px]">
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização do Mundo Gastronômico"
            className="rounded-lg"
          />
        </div>

        {/* Info Overlay */}
        <div className="absolute bottom-6 left-6 right-6 bg-card/95 backdrop-blur-sm rounded-lg p-6 shadow-xl border border-border">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold mb-2 text-foreground">
                Localização Privilegiada
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                {address}
              </p>
              <div className="flex flex-wrap gap-3">
                <button 
                  className="bg-primary text-black font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm"
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank')}
                >
                  Ver Rota
                </button>
                <button 
                  className="bg-secondary text-foreground font-medium px-4 py-2 rounded-lg hover:bg-secondary/80 transition-colors text-sm"
                  onClick={() => window.open('tel:+5511978345918', '_blank')}
                >
                  Ligar Agora
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleMap;
