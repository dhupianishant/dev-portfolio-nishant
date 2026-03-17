import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { scrollYProgress } = useScroll();
  const progressX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.3 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Determine active section
      const sections = navItems.map(item => item.href.slice(1));
      const scrollY = window.scrollY + 100; // offset for navbar height
      let current = '';
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollY) {
          current = sections[i];
          break;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // call once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove('light'); // Ensure dark theme
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass-nav' : ''
      }`}
    >
      {/* Scroll progress (navbar underline) */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[3px] origin-left"
        style={{ scaleX: progressX }}
      >
        <div
          className="h-full w-full"
          style={{
            background: 'linear-gradient(90deg, hsl(239 84% 67%), hsl(270 75% 60%))',
            boxShadow: '0 0 24px hsl(239 84% 67% / 0.35), 0 0 28px hsl(270 75% 60% / 0.25)',
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
        <a href="#" className="font-display text-xl font-bold tracking-tight">
          <span className="gradient-text">Dev</span>
          <span className="text-foreground">Studio</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-sm font-medium transition-colors duration-300 ${
                activeSection === item.href.slice(1)
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-full font-display text-sm font-semibold transition-all duration-300 hover:scale-105 glow-primary"
            style={{ background: 'linear-gradient(135deg, hsl(239 84% 67%), hsl(270 75% 60%))' }}
          >
            Let's Talk
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass-nav px-6 pb-6"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`block py-3 transition-colors ${
                activeSection === item.href.slice(1)
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navigation;
