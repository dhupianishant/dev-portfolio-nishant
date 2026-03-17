import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturedWork from '@/components/FeaturedWork';
import ServicesSection from '@/components/ServicesSection';
import ProcessTimeline from '@/components/ProcessTimeline';
import TechStack from '@/components/TechStack';
import AboutSection from '@/components/AboutSection';
import Testimonials from '@/components/Testimonials';
import ContactCTA from '@/components/ContactCTA';
import Loader from '@/components/Loader';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
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
        <TechStack />
        <AboutSection />
        <Testimonials />
        <ContactCTA />
      </main>
    </>
  );
};

export default Index;
