import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturedWork from '@/components/FeaturedWork';
import ServicesSection from '@/components/ServicesSection';
import ProcessTimeline from '@/components/ProcessTimeline';
import AboutSection from '@/components/AboutSection';
import Testimonials from '@/components/Testimonials';
import ContactCTA from '@/components/ContactCTA';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import api from '@/utils/api';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Log page view
    api.post('/log', {
      type: 'PAGE_VIEW',
      message: 'User visited the homepage',
      meta: { page: 'home' }
    }).catch(err => console.error('Logging error:', err));
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} />
      <Navigation />
      <main>
        <HeroSection />
        <FeaturedWork />
        <ServicesSection />
        <ProcessTimeline />
        <AboutSection />
        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
};

export default Index;
