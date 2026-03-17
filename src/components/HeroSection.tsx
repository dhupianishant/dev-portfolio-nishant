import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { HeroScene } from './Scene3D';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <HeroScene />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 30 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="glass-card px-4 py-1.5 text-xs font-medium text-muted-foreground flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-primary" />
              Available for new projects
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, filter: 'blur(10px)', y: 40 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.8, delay: 2.4 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.9]"
          >
            <span className="block">Full Stack</span>
            <span className="block gradient-text">Developer</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, filter: 'blur(10px)', y: 30 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.8, delay: 2.6 }}
            className="mt-6 text-xl md:text-2xl text-muted-foreground font-light max-w-xl"
          >
            Building modern web experiences with precision and craft.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.8, delay: 2.8 }}
            className="flex flex-wrap gap-3 mt-4 mb-10"
          >
            {['React', 'Next.js', 'Node.js', 'Shopify'].map((tech) => (
              <span key={tech} className="text-sm text-muted-foreground font-medium">
                {tech}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.8, delay: 3 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-display text-sm font-semibold transition-all duration-300 hover:scale-105 hover:gap-3 glow-primary"
              style={{ background: 'linear-gradient(135deg, hsl(239 84% 67%), hsl(270 75% 60%))' }}
            >
              View Work
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-display text-sm font-semibold glass-card hover:scale-105 transition-all duration-300"
            >
              Start a Project
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1.5"
        >
          <motion.div className="w-1 h-1 rounded-full bg-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
