import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    document.title = "Página não encontrada - Mundo Gastronômico";
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-playfair font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-playfair text-foreground mb-4">
          Página não encontrada
        </h2>
        <p className="text-muted-foreground mb-8">
          Desculpe, a página que você procura não existe ou foi movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <Link to="/">
            <Button className="btn-gold gap-2 w-full">
              <Home className="h-4 w-4" />
              Ir para o início
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
