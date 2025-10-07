
import { useState } from 'react';
import { Menu, X, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ReservationDialog from '@/components/ReservationDialog';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  const menuItems = [
    { label: 'Início', href: '#home' },
    { label: 'Sobre', href: '#about' },
    { label: 'Cardápio', href: '#menu' },
    { label: 'Pedidos Online', href: '/pedidos', isRoute: true },
    { label: 'Aulas', href: '#classes' },
    { label: 'Galeria', href: '#gallery' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contato', href: '#contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-primary/20 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Utensils className="h-8 w-8 text-primary" />
            <h1 className="font-playfair text-xl font-bold text-gradient">Mundo Gastronômico</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              item.isRoute ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
                >
                  {item.label}
                </a>
              )
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="btn-gold" onClick={() => setIsReservationOpen(true)}>
              Reservar Mesa
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <nav className="flex flex-col space-y-4 p-4">
              {menuItems.map((item) => (
                item.isRoute ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              ))}
              <Button className="btn-gold w-full" onClick={() => {
                setIsMenuOpen(false);
                setIsReservationOpen(true);
              }}>
                Reservar Mesa
              </Button>
            </nav>
          </div>
        )}
      </div>

      {/* Reservation Dialog/Drawer */}
      <ReservationDialog 
        open={isReservationOpen}
        onOpenChange={setIsReservationOpen}
      />
    </header>
  );
};

export default Header;
