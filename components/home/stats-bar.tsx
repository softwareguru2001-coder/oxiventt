'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: '25+', label: 'Years of Excellence', desc: 'Est. 1999' },
  { value: '5,000+', label: 'Installations Completed', desc: 'Across India' },
  { value: '15+', label: 'Industry Awards', desc: 'Recognised quality' },
  { value: '50+', label: 'Cities Served', desc: 'Pan-India reach' },
];

export function StatsBar() {
  return (
    <section className="bg-gray-950 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07, duration: 0.45 }}
              className="flex flex-col items-center justify-center py-9 sm:py-11 px-5 text-center group"
            >
              <span className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-white tracking-tight leading-none mb-1.5">
                {stat.value}
              </span>
              <span className="text-[0.7rem] sm:text-xs text-gray-400 font-semibold uppercase tracking-[0.12em] mb-0.5">
                {stat.label}
              </span>
              <span className="text-[0.65rem] text-gray-600 tracking-wide hidden sm:block">
                {stat.desc}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
