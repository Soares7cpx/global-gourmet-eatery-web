import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const routeLabels: Record<string, string> = {
  '/pedidos': 'Pedidos Online',
  '/auth': 'Autenticação',
  '/minhas-reservas': 'Minhas Reservas',
  '/receitas': 'Receitas',
  '/admin': 'Painel Admin',
  '/admin/reservas': 'Reservas',
  '/admin/pedidos': 'Pedidos',
  '/admin/cardapio': 'Cardápio',
  '/admin/cupons': 'Cupons',
  '/admin/usuarios': 'Usuários',
};

const PageBreadcrumb = () => {
  const location = useLocation();

  if (location.pathname === '/') return null;

  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [{ label: 'Início', href: '/' }];

  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;
    breadcrumbs.push({
      label: routeLabels[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1),
      href: isLast ? undefined : currentPath,
    });
  });

  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4">
      <ol className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
        {breadcrumbs.map((item, index) => (
          <li key={index} className="inline-flex items-center gap-1.5">
            {index > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0" />}
            {item.href ? (
              <Link
                to={item.href}
                className="hover:text-primary transition-colors inline-flex items-center gap-1"
              >
                {index === 0 && <Home className="h-3.5 w-3.5" />}
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default PageBreadcrumb;
