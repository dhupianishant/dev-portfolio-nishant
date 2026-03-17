import { motion } from 'framer-motion';
import { ArrowRight, Mail, Github, Linkedin } from 'lucide-react';

const ContactCTA = () => {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
            Let's Build
            <br />
            <span className="gradient-text">Something Great</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
            Have a project in mind? Let's create something extraordinary together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="mailto:hello@devstudio.com"
              className="group inline-flex items-center gap-2 px-10 py-5 rounded-full font-display text-base font-semibold transition-all duration-300 hover:scale-105 hover:gap-3 glow-primary"
              style={{ background: 'linear-gradient(135deg, hsl(239 84% 67%), hsl(270 75% 60%))' }}
            >
              Start a Project
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="mailto:hello@devstudio.com"
              className="inline-flex items-center gap-2 px-10 py-5 rounded-full font-display text-base font-semibold glass-card hover:scale-105 transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
              hello@devstudio.com
            </a>
          </div>

          <div className="flex justify-center gap-4">
            {[
              { icon: Github, href: '#' },
              { icon: Linkedin, href: '#' },
              { icon: Mail, href: 'mailto:hello@devstudio.com' },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                whileHover={{ scale: 1.15, y: -2 }}
                className="p-4 rounded-full glass-card text-muted-foreground hover:text-foreground transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-24 pt-8 border-t border-border max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 DevStudio. All rights reserved.</p>
          <p className="font-display">
            Crafted with <span className="gradient-text font-bold">passion</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
