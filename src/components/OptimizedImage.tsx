
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
    <div className={`relative overflow-hidden ${className}`}>
      {/* Enhanced Skeleton Loader with shimmer effect */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/30 via-secondary/50 to-secondary/30 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        </div>
      )}
      
      {/* Image with smooth fade-in */}
      <img
        src={optimizedSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-500 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        width={width}
        height={height}
      />
      
      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 bg-secondary/30 flex items-center justify-center">
          <span className="text-muted-foreground text-sm">Imagem indisponível</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
