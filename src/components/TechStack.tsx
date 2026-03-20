import { motion } from 'framer-motion';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, SiNodedotjs, SiExpress, SiPython, SiPostgresql, SiMongodb, SiRedis, SiSupabase, SiShopify, SiGit, SiFigma } from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

const categories = [
  {
    name: 'Frontend',
    techs: [
      { name: 'React.JS', color: '#61DAFB', icon: SiReact },
      { name: 'Next.JS', color: '#ffffff', icon: SiNextdotjs },
      { name: 'TypeScript', color: '#3178C6', icon: SiTypescript },
      { name: 'Tailwind CSS', color: '#06B6D4', icon: SiTailwindcss },
      { name: 'Framer Motion', color: '#FF0050', icon: SiFramer },
    ],
  },
  {
    name: 'Backend',
    techs: [
      { name: 'Node.JS', color: '#339933', icon: SiNodedotjs },
      { name: 'Express.JS', color: '#ffffff', icon: SiExpress },
      { name: 'Python', color: '#3776AB', icon: SiPython },
    ],
  },
  {
    name: 'Database',
    techs: [
      { name: 'PostgreSQL', color: '#4169E1', icon: SiPostgresql },
      { name: 'MongoDB', color: '#47A248', icon: SiMongodb },
      { name: 'Redis', color: '#DC382D', icon: SiRedis },
      { name: 'Supabase', color: '#3FCF8E', icon: SiSupabase },
    ],
  },
  {
    name: 'Tools',
    techs: [
      { name: 'Shopify', color: '#2496ED', icon: SiShopify },
      { name: 'Git', color: '#F05032', icon: SiGit },
      { name: 'Figma', color: '#F24E1E', icon: SiFigma },
      { name: 'AWS', color: '#FF9900', icon: FaAws },
    ],
  },
];

const TechStack = () => {
  return (
    <section className="section-padding">
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
                    <div className="flex items-center gap-3 group cursor-pointer">
                      <tech.icon className="w-5 h-5 transition-all duration-300 group-hover:scale-110" style={{ color: tech.color }} />
                      <span className="text-sm font-medium">{tech.name}</span>
                    </div>
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
