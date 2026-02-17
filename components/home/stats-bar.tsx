'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: '25+', label: 'Years of Excellence' },
  { value: '5,000+', label: 'Installations Completed' },
  { value: '15+', label: 'Industry Awards' },
  { value: '50+', label: 'Cities Served' },
];

export function StatsBar() {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-100">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07, duration: 0.45 }}
              className="flex flex-col items-center justify-center py-10 sm:py-12 px-5 text-center"
            >
              <span className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-gray-900 tracking-tight leading-none mb-2.5">
                {stat.value}
              </span>
              <span className="text-[0.7rem] sm:text-xs text-gray-400 font-semibold uppercase tracking-[0.12em]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
