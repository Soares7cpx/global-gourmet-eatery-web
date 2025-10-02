
import { Utensils, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Utensils className="h-8 w-8 text-primary" />
                <h3 className="font-playfair text-xl font-bold text-gradient">Mundo Gastronômico</h3>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Uma jornada culinária pelos sabores do mundo, onde cada prato conta uma história 
                e cada refeição é uma celebração da diversidade gastronômica internacional.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors">
                  <Instagram className="h-5 w-5 text-primary" />
                </a>
                <a href="#" className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors">
                  <Facebook className="h-5 w-5 text-primary" />
                </a>
                <a href="#" className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors">
                  <Twitter className="h-5 w-5 text-primary" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-foreground">Links Rápidos</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-muted-foreground hover:text-primary transition-colors">Início</a></li>
                <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors">Sobre Nós</a></li>
                <li><a href="#menu" className="text-muted-foreground hover:text-primary transition-colors">Cardápio</a></li>
                <li><a href="#classes" className="text-muted-foreground hover:text-primary transition-colors">Aulas</a></li>
                <li><a href="#faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contato</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-foreground">Contato</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Rua Gourmet, 123</li>
                <li>Jardins, São Paulo - SP</li>
                <li>CEP: 01234-567</li>
                <li className="pt-2">
                  <a href="tel:+5511978345918" className="hover:text-primary transition-colors">
                    (11) 97834-5918
                  </a>
                </li>
                <li>
                  <a href="mailto:contato@mundogastronomico.com" className="hover:text-primary transition-colors">
                    contato@mundogastronomico.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 Mundo Gastronômico. Todos os direitos reservados. 
              <span className="mx-2">|</span>
              <a href="#" className="hover:text-primary transition-colors">Política de Privacidade</a>
              <span className="mx-2">|</span>
              <a href="#" className="hover:text-primary transition-colors">Termos de Uso</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
