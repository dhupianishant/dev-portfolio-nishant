import { motion } from 'framer-motion';

const categories = [
  {
    name: 'Frontend',
    techs: [
      { name: 'React', color: '#61DAFB' },
      { name: 'Next.js', color: '#ffffff' },
      { name: 'TypeScript', color: '#3178C6' },
      { name: 'Tailwind', color: '#06B6D4' },
      { name: 'Framer Motion', color: '#FF0050' },
    ],
  },
  {
    name: 'Backend',
    techs: [
      { name: 'Node.js', color: '#339933' },
      { name: 'Express', color: '#ffffff' },
      { name: 'GraphQL', color: '#E10098' },
      { name: 'Python', color: '#3776AB' },
    ],
  },
  {
    name: 'Database',
    techs: [
      { name: 'PostgreSQL', color: '#4169E1' },
      { name: 'MongoDB', color: '#47A248' },
      { name: 'Redis', color: '#DC382D' },
      { name: 'Supabase', color: '#3FCF8E' },
    ],
  },
  {
    name: 'Tools',
    techs: [
      { name: 'Docker', color: '#2496ED' },
      { name: 'Git', color: '#F05032' },
      { name: 'Figma', color: '#F24E1E' },
      { name: 'AWS', color: '#FF9900' },
    ],
  },
];

const TechStack = () => {
  return (
    <section className="section-padding noise-bg">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-lg">Tools and technologies I work with daily.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
                {cat.name}
              </h3>
              <div className="space-y-3">
                {cat.techs.map((tech, ti) => (
                  <motion.div
                    key={tech.name}
                    className="glass-card px-4 py-3 flex items-center gap-3 group cursor-pointer"
                    whileHover={{ scale: 1.05, x: 8 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    style={{ animationDelay: `${ti * 0.5}s` }}
                  >
                    <div
                      className="w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-150 group-hover:shadow-lg"
                      style={{ backgroundColor: tech.color, boxShadow: `0 0 0px ${tech.color}` }}
                    />
                    <span className="text-sm font-medium">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
