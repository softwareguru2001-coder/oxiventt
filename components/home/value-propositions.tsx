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
    <section className="py-20 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">
            Why Choose Oxiventt
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-gray-900 leading-tight tracking-tight mb-5">
            Engineering Excellence in Every Fan
          </h2>
          <p className="text-base text-gray-500 leading-relaxed">
            Industry-leading ventilation solutions backed by 25+ years of manufacturing expertise
            and a commitment to performance, reliability, and efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden mb-16">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
              className="bg-white p-7 sm:p-8 group hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-gray-200 transition-colors flex items-center justify-center mb-5">
                <value.icon className="w-5 h-5 text-gray-700" />
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

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="bg-gray-900 rounded-2xl px-8 sm:px-12 py-10 sm:py-12"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="grid grid-cols-3 gap-8 sm:gap-16 flex-1">
              {[
                { value: '25+', label: 'Years' },
                { value: '5,000+', label: 'Installations' },
                { value: '98%', label: 'Satisfaction' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-1">
                    {item.value}
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest font-medium">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 text-sm font-semibold rounded-full hover:bg-gray-100 transition-colors"
              >
                Get a Quote
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-white text-sm font-medium rounded-full hover:border-white/40 hover:bg-white/5 transition-colors"
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
