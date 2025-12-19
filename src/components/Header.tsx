import { useState } from 'react';
import { Menu, X, Utensils, User, LogOut, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ReservationDialog from '@/components/ReservationDialog';
import { useAuth } from '@/hooks/useAuth';
import { Shield } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const { user, signOut, loading, isAdmin } = useAuth();
  const navigate = useNavigate();

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

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

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

          {/* CTA Button + User Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Button className="btn-gold" onClick={() => setIsReservationOpen(true)}>
              Reservar Mesa
            </Button>

            {!loading && (
              user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => navigate('/minhas-reservas')}>
                      <Calendar className="mr-2 h-4 w-4" />
                      Minhas Reservas
                    </DropdownMenuItem>
                    {isAdmin && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigate('/admin')}>
                          <Shield className="mr-2 h-4 w-4" />
                          Painel Admin
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="outline" onClick={() => navigate('/auth')}>
                  Entrar
                </Button>
              )
            )}
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

              {!loading && user && (
                <>
                  <Link
                    to="/minhas-reservas"
                    className="text-foreground hover:text-primary transition-colors duration-300 font-medium flex items-center gap-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Calendar className="h-4 w-4" />
                    Minhas Reservas
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="text-primary hover:text-primary/80 transition-colors duration-300 font-medium flex items-center gap-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Shield className="h-4 w-4" />
                      Painel Admin
                    </Link>
                  )}
                </>
              )}

              <Button className="btn-gold w-full" onClick={() => {
                setIsMenuOpen(false);
                setIsReservationOpen(true);
              }}>
                Reservar Mesa
              </Button>

              {!loading && (
                user ? (
                  <Button variant="outline" className="w-full" onClick={() => {
                    setIsMenuOpen(false);
                    handleSignOut();
                  }}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/auth');
                  }}>
                    Entrar
                  </Button>
                )
              )}
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
