import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-in';
  delay?: number;
}

const animationClasses = {
  'fade-up': 'opacity-0 translate-y-10',
  'fade-in': 'opacity-0',
  'slide-left': 'opacity-0 -translate-x-10',
  'slide-right': 'opacity-0 translate-x-10',
  'scale-in': 'opacity-0 scale-95',
};

const visibleClasses = {
  'fade-up': 'opacity-100 translate-y-0',
  'fade-in': 'opacity-100',
  'slide-left': 'opacity-100 translate-x-0',
  'slide-right': 'opacity-100 translate-x-0',
  'scale-in': 'opacity-100 scale-100',
};

const AnimatedSection = ({ 
  children, 
  className = '', 
  animation = 'fade-up',
  delay = 0 
}: AnimatedSectionProps) => {
  const { ref, isVisible } = useScrollAnimation({ 
    threshold: 0.1,
    triggerOnce: true 
  });

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        animationClasses[animation],
        isVisible && visibleClasses[animation],
        className
      )}
      style={{ 
        transitionDelay: isVisible ? `${delay}ms` : '0ms' 
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;