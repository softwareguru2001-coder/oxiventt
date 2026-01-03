'use client';

import { motion } from 'framer-motion';
import {
  Wind,
  Zap,
  Shield,
  Headphones,
  Award,
  Gauge,
} from 'lucide-react';

interface ValueProp {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const values: ValueProp[] = [
  {
    icon: <Wind className="w-7 h-7" />,
    title: 'High Air Delivery',
    description: 'Maximum airflow with optimized blade design',
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: 'Energy Efficient',
    description: 'Advanced motors reduce power consumption by 30%',
  },
  {
    icon: <Shield className="w-7 h-7" />,
    title: 'ISO Certified Quality',
    description: 'Meets international standards for industrial equipment',
  },
  {
    icon: <Headphones className="w-7 h-7" />,
    title: 'Pan-India Support',
    description: '24/7 technical assistance and rapid response',
  },
  {
    icon: <Award className="w-7 h-7" />,
    title: 'Industrial Build',
    description: 'Built to withstand harsh operating conditions',
  },
  {
    icon: <Gauge className="w-7 h-7" />,
    title: 'High Performance',
    description: 'Precision engineering for consistent operation',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function ValuePropositions() {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-industrial-900 via-industrial-800 to-industrial-900 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold mb-4 border border-blue-500/30">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Built for Excellence
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Industry-leading ventilation solutions backed by decades of engineering expertise
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative"
            >
              <div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-blue-300 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 backdrop-blur-sm">
                    {value.icon}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                    {value.title}
                  </h3>

                  <p className="text-white/70 leading-relaxed">
                    {value.description}
                  </p>
                </div>

                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 group-hover:ring-white/20 transition-all duration-500" />
                <div className="absolute inset-0 rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 group-hover:shadow-glow transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-md border border-white/10"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">25+</div>
              <div className="text-white/70 font-medium">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">5000+</div>
              <div className="text-white/70 font-medium">Installations</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">98%</div>
              <div className="text-white/70 font-medium">Client Satisfaction</div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl opacity-20 animate-float" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }} />
    </section>
  );
}
