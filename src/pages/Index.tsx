
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import MenuSection from '@/components/MenuSection';
import GallerySection from '@/components/GallerySection';
import TestimonialsSection from '@/components/TestimonialsSection';
import LocationSection from '@/components/LocationSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <GallerySection />
      <TestimonialsSection />
      <LocationSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
