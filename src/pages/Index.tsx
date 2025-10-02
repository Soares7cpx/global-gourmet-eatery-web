
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import SocialProofSection from '@/components/SocialProofSection';
import AboutSection from '@/components/AboutSection';
import MenuSection from '@/components/MenuSection';
import ClassesSection from '@/components/ClassesSection';
import GallerySection from '@/components/GallerySection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import LocationSection from '@/components/LocationSection';
import ContactSection from '@/components/ContactSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <SocialProofSection />
      <AboutSection />
      <MenuSection />
      <ClassesSection />
      <GallerySection />
      <TestimonialsSection />
      <FAQSection />
      <LocationSection />
      <ContactSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default Index;
