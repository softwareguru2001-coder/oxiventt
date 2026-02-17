'use client';

import { motion } from 'framer-motion';
import { Wind, Zap, Shield, Headphones, Award, Gauge } from 'lucide-react';
import Link from 'next/link';

const values = [
  {
    icon: Wind,
    title: 'High Air Delivery',
    description: 'Optimized blade design ensures maximum CFM output with uniform airflow distribution',
  },
  {
    icon: Zap,
    title: 'Energy Efficient',
    description: 'Advanced motors reduce power consumption by up to 30% vs. conventional designs',
  },
  {
    icon: Shield,
    title: 'ISO Certified Quality',
    description: 'Every unit manufactured to ISO 27001 standards with rigorous quality control',
  },
  {
    icon: Headphones,
    title: 'Pan-India Support',
    description: 'Dedicated technical assistance team with rapid on-site response nationwide',
  },
  {
    icon: Award,
    title: 'Industrial-Grade Build',
    description: 'Corrosion-resistant materials and heavy-duty construction for harsh environments',
  },
  {
    icon: Gauge,
    title: 'Consistent Performance',
    description: 'Precision-balanced impellers ensuring vibration-free operation at all loads',
  },
];

export function ValuePropositions() {
  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">

        {/* Section header */}
        <div className="max-w-2xl mb-16 lg:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-blue-500" />
            <p className="text-xs font-bold text-blue-600 uppercase tracking-[0.18em]">
              Why Choose Oxiventt
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-gray-900 leading-tight tracking-tight mb-5">
            Engineering Excellence<br className="hidden sm:block" /> in Every Fan
          </h2>
          <p className="text-base text-gray-500 leading-relaxed">
            Industry-leading ventilation solutions backed by 25+ years of manufacturing expertise
            and a commitment to performance, reliability, and efficiency.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden mb-14">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
              className="bg-white p-8 sm:p-9 group hover:bg-gray-50/80 transition-colors duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors flex items-center justify-center mb-5">
                <value.icon className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-2 tracking-tight">
                {value.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-gray-950 rounded-2xl px-8 sm:px-14 py-11 sm:py-14 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.12)_0%,_transparent_65%)]" />
          <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
            <svg viewBox="0 0 200 200" className="w-full h-full text-white fill-current">
              <path d="M100 0 L200 100 L100 200 L0 100 Z" />
            </svg>
          </div>
          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div className="flex-1">
              <p className="text-xs font-semibold text-blue-400 uppercase tracking-[0.18em] mb-3">Trusted by Industry Leaders</p>
              <div className="flex flex-wrap gap-10 sm:gap-16">
                {[
                  { value: '25+', label: 'Years' },
                  { value: '5,000+', label: 'Installations' },
                  { value: '98%', label: 'Satisfaction' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-1">
                      {item.value}
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest font-medium">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-gray-900 text-sm font-bold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Get a Quote
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-7 py-3.5 border border-white/20 text-white text-sm font-medium rounded-lg hover:border-white/40 hover:bg-white/5 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
