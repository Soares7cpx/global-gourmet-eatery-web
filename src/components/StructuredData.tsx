import { useEffect } from 'react';

const StructuredData = () => {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Restaurant",
          "@id": "https://mundogastronomico.com.br/#restaurant",
          "name": "Mundo Gastronômico",
          "description": "Restaurante de culinária internacional em São Paulo, oferecendo pratos autênticos de mais de 15 países diferentes",
          "url": "https://mundogastronomico.com.br",
          "telephone": "+55-11-97834-5918",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Av. Paulista, 1578",
            "addressLocality": "São Paulo",
            "addressRegion": "SP",
            "postalCode": "01310-200",
            "addressCountry": "BR"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "-23.561414",
            "longitude": "-46.656180"
          },
          "servesCuisine": [
            "Italian",
            "Japanese",
            "Indian",
            "French",
            "Thai",
            "Greek",
            "Spanish",
            "Lebanese",
            "Peruvian",
            "Vietnamese"
          ],
          "priceRange": "$$-$$$",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "10000",
            "bestRating": "5"
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "opens": "18:00",
              "closes": "23:00"
            },
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Saturday",
                "Sunday"
              ],
              "opens": "12:00",
              "closes": "23:00"
            }
          ],
          "acceptsReservations": "True",
          "image": "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=1200&q=80"
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://mundogastronomico.com.br/#business",
          "name": "Mundo Gastronômico - Aulas de Culinária Internacional",
          "description": "Escola de culinária internacional oferecendo aulas práticas, workshops e eventos privados",
          "url": "https://mundogastronomico.com.br",
          "telephone": "+55-11-97834-5918",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Av. Paulista, 1578",
            "addressLocality": "São Paulo",
            "addressRegion": "SP",
            "postalCode": "01310-200",
            "addressCountry": "BR"
          },
          "priceRange": "$$-$$$",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Cursos de Culinária",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Course",
                  "name": "Culinária Italiana Clássica",
                  "description": "Aprenda as técnicas tradicionais da cozinha italiana"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Course",
                  "name": "Sushi e Culinária Japonesa",
                  "description": "Domine a arte da culinária japonesa"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Course",
                  "name": "Pâtisserie Francesa",
                  "description": "Técnicas de confeitaria francesa"
                }
              }
            ]
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://mundogastronomico.com.br/#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://mundogastronomico.com.br"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Cardápio",
              "item": "https://mundogastronomico.com.br#menu"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Sobre Nós",
              "item": "https://mundogastronomico.com.br#about"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "Aulas",
              "item": "https://mundogastronomico.com.br#classes"
            },
            {
              "@type": "ListItem",
              "position": 5,
              "name": "Contato",
              "item": "https://mundogastronomico.com.br#contact"
            }
          ]
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};

export default StructuredData;