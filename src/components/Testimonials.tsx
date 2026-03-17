import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO, Lumière',
    text: 'Working with them transformed our digital presence. The attention to detail and performance optimization was exceptional.',
  },
  {
    name: 'Marcus Rivera',
    role: 'CTO, Nexus',
    text: 'They delivered a complex real-time dashboard ahead of schedule. The code quality and architecture were top-notch.',
  },
  {
    name: 'Emily Park',
    role: 'Founder, Atlas',
    text: 'The 3D visualizations they built for our platform became our biggest differentiator. Truly innovative work.',
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-padding noise-bg">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Client <span className="gradient-text">Words</span>
          </h2>
        </motion.div>

        <div className="relative glass-card p-10 md:p-16">
          <Quote className="w-10 h-10 text-primary/20 mb-6 mx-auto" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-lg md:text-xl leading-relaxed text-foreground/90 mb-8">
                "{testimonials[current].text}"
              </p>
              <div>
                <p className="font-display font-bold">{testimonials[current].name}</p>
                <p className="text-sm text-muted-foreground">{testimonials[current].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="p-3 rounded-full glass-card hover:scale-110 transition-transform"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-primary w-6' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-3 rounded-full glass-card hover:scale-110 transition-transform"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
