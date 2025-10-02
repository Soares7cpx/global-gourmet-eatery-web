
import { useEffect } from 'react';
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
import WhatsAppButton from '@/components/WhatsAppButton';
import BackToTop from '@/components/BackToTop';
import CookieConsent from '@/components/CookieConsent';
import SkipNavigation from '@/components/SkipNavigation';

const Index = () => {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SkipNavigation />
      <Header />
      <main id="main-content">
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
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
      <CookieConsent />
    </div>
  );
};

export default Index;
