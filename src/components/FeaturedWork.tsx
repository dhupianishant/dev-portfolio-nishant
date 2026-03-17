import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Lumière',
    category: 'E-Commerce Platform',
    description: 'Luxury fashion marketplace with AI-powered styling.',
    color: '#6366f1',
    tech: ['Next.js', 'Shopify', 'AI'],
  },
  {
    title: 'Nexus',
    category: 'SaaS Dashboard',
    description: 'Real-time analytics platform for enterprise teams.',
    color: '#a855f7',
    tech: ['React', 'Node.js', 'WebSocket'],
  },
  {
    title: 'Meridian',
    category: 'FinTech App',
    description: 'Modern banking experience with smart insights.',
    color: '#818cf8',
    tech: ['React Native', 'PostgreSQL', 'Stripe'],
  },
  {
    title: 'Atlas',
    category: 'Travel Platform',
    description: 'Interactive travel planning with 3D globe visualization.',
    color: '#c084fc',
    tech: ['Three.js', 'Next.js', 'Maps API'],
  },
  {
    title: 'Prism',
    category: 'Creative Tool',
    description: 'Collaborative design tool for distributed teams.',
    color: '#6366f1',
    tech: ['Canvas API', 'WebRTC', 'React'],
  },
];

const FeaturedWork = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(projects.length - 1) * 80}%`]);

  return (
    <section id="work" ref={containerRef} className="relative" style={{ height: `${projects.length * 100}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="px-6 md:px-12 lg:px-24 mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-lg">Selected projects that showcase craft and impact.</p>
        </motion.div>

        <motion.div style={{ x }} className="flex gap-8 px-6 md:px-12 lg:px-24">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className="flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[50vw] group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="glass-card overflow-hidden h-[60vh] relative">
                <div
                  className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-30"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${project.color}, transparent 70%)`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-32 h-32 rounded-3xl animate-morph"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}, ${project.color}88)`,
                      filter: 'blur(0px)',
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {project.category}
                    </span>
                    <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl font-bold">{project.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm">{project.description}</p>
                  <div className="flex gap-2 mt-4">
                    {project.tech.map((t) => (
                      <span key={t} className="text-xs px-3 py-1 rounded-full glass-card text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedWork;
