import { motion } from 'framer-motion';
import { Globe, ShoppingBag, Code2, Settings } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Web Applications',
    description: 'Full-stack SaaS platforms and dashboards.',
    color: '#6366f1',
  },
  {
    icon: Code2,
    title: 'Business Websites',
    description: 'Modern high-converting websites.',
    color: '#a855f7',
  },
  {
    icon: ShoppingBag,
    title: 'Shopify Development',
    description: 'Custom themes and store optimizations.',
    color: '#818cf8',
  },
  {
    icon: Settings,
    title: 'Custom Systems',
    description: 'Internal tools, portals, APIs.',
    color: '#c084fc',
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            What I <span className="gradient-text">Build</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-lg">Specialized in modern web experiences.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="glass-card p-8 md:p-10 group cursor-pointer relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 50%, ${service.color}, transparent 70%)` }}
              />
              <div className="relative z-10">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{ background: `${service.color}20` }}
                >
                  <service.icon className="w-7 h-7" style={{ color: service.color }} />
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
