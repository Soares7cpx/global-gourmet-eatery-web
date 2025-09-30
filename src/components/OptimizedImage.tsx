
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height, 
  priority = false 
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generate optimized Unsplash URL
  const getOptimizedSrc = (originalSrc: string, w?: number, h?: number) => {
    if (!originalSrc.includes('unsplash.com')) return originalSrc;
    
    const baseUrl = originalSrc.split('?')[0];
    const params = new URLSearchParams();
    params.set('auto', 'format');
    params.set('fit', 'crop');
    params.set('q', '80');
    
    if (w) params.set('w', w.toString());
    if (h) params.set('h', h.toString());
    
    return `${baseUrl}?${params.toString()}`;
  };

  const optimizedSrc = getOptimizedSrc(src, width, height);

  return (
    <div className="relative overflow-hidden">
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
          <div className="text-muted-foreground text-sm">Carregando...</div>
        </div>
      )}
      
      <img
        src={optimizedSrc}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        width={width}
        height={height}
      />
      
      {hasError && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <div className="text-muted-foreground text-sm">Erro ao carregar imagem</div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
