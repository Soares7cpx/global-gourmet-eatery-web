import { useEffect, lazy, Suspense } from 'react';
import Header from '@/components/Header';
import StructuredData from '@/components/StructuredData';
import HeroSection from '@/components/HeroSection';
import SocialProofSection from '@/components/SocialProofSection';
import WhatsAppButton from '@/components/WhatsAppButton';
import BackToTop from '@/components/BackToTop';
import CookieConsent from '@/components/CookieConsent';
import SkipNavigation from '@/components/SkipNavigation';

// Lazy load heavy sections for better performance
const AboutSection = lazy(() => import('@/components/AboutSection'));
const MenuSection = lazy(() => import('@/components/MenuSection'));
const ClassesSection = lazy(() => import('@/components/ClassesSection'));
const GallerySection = lazy(() => import('@/components/GallerySection'));
const ChefsSection = lazy(() => import('@/components/ChefsSection'));
const TestimonialsSection = lazy(() => import('@/components/TestimonialsSection'));
const FAQSection = lazy(() => import('@/components/FAQSection'));
const LocationSection = lazy(() => import('@/components/LocationSection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));
const NewsletterSection = lazy(() => import('@/components/NewsletterSection'));
const Footer = lazy(() => import('@/components/Footer'));

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
      <StructuredData />
      <SkipNavigation />
      <Header />
      <main id="main-content">
        <HeroSection />
        <SocialProofSection />
        <Suspense fallback={<div className="py-20" aria-label="Carregando conteúdo" />}>
          <AboutSection />
          <MenuSection />
          <ClassesSection />
          <GallerySection />
          <ChefsSection />
          <TestimonialsSection />
          <FAQSection />
          <LocationSection />
          <ContactSection />
          <NewsletterSection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <WhatsAppButton />
      <BackToTop />
      <CookieConsent />
    </div>
  );
};

export default Index;
