import { motion } from 'framer-motion';
import { MapPin, Briefcase, GraduationCap } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="w-72 h-72 md:w-80 md:h-80 rounded-3xl glass-card overflow-hidden mx-auto md:mx-0">
                <div
                  className="w-full h-full animate-morph"
                  style={{
                    background: 'linear-gradient(135deg, hsl(239 84% 67% / 0.3), hsl(270 75% 60% / 0.3))',
                  }}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl glass-card flex items-center justify-center animate-float">
                <span className="font-display text-2xl font-bold gradient-text">5+</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              I'm a full-stack developer passionate about building beautiful, performant web experiences.
              I believe great software should feel invisible — fast, intuitive, and delightful.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              With 5+ years of experience shipping products for startups and enterprises, I bring technical depth and design sensibility to every project.
            </p>

            <div className="space-y-4">
              {[
                { icon: MapPin, text: 'San Francisco, CA' },
                { icon: Briefcase, text: '5+ years experience' },
                { icon: GraduationCap, text: 'CS @ Stanford University' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-muted-foreground">
                  <item.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
