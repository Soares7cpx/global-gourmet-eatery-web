import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: string;
}

const SEOHead = ({ title, description, path = '', image, type = 'website' }: SEOHeadProps) => {
  const baseUrl = 'https://mundogastronomico.com.br';
  const fullUrl = `${baseUrl}${path}`;
  const fullTitle = `${title} | Mundo Gastronômico`;
  const ogImage = image || 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=1200&q=80';

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        if (property.startsWith('og:') || property.startsWith('article:')) {
          el.setAttribute('property', property);
        } else {
          el.setAttribute('name', property);
        }
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', fullTitle);
    setMeta('og:description', description);
    setMeta('og:url', fullUrl);
    setMeta('og:image', ogImage);
    setMeta('og:type', type);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    return () => {
      // Cleanup canonical on unmount
      canonical?.remove();
    };
  }, [fullTitle, description, fullUrl, ogImage, type]);

  return null;
};

export default SEOHead;
