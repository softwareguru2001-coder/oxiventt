'use client';

import { motion } from 'framer-motion';
import { Award, ShieldCheck } from 'lucide-react';
import { CertificationBadge } from '@/components/ui/certification-badge';

const certifications = [
  {
    title: 'ISO 9001:2015 Certified',
    description: 'Quality Management System certification for manufacturing of industrial fans. Ensuring consistent quality and customer satisfaction.',
    pdfUrl: '/iso.pdf',
    icon: <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10" />,
  },
  {
    title: 'Startup India Recognized',
    description: 'Officially recognized by the Department for Promotion of Industry and Internal Trade, Government of India.',
    pdfUrl: '/startupind.pdf',
    icon: <Award className="w-8 h-8 sm:w-10 sm:h-10" />,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Certifications() {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-br from-industrial-900 via-industrial-800 to-industrial-900 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

      <div className="container mx-auto px-3 sm:px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-blue-500/20 text-blue-300 text-xs sm:text-sm font-semibold mb-3 sm:mb-4 border border-blue-500/30">
            Trusted & Certified
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Our Certifications
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto px-4">
            Recognized for quality and excellence in industrial ventilation manufacturing
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto"
        >
          {certifications.map((cert, index) => (
            <motion.div key={index} variants={item}>
              <CertificationBadge
                title={cert.title}
                description={cert.description}
                pdfUrl={cert.pdfUrl}
                icon={cert.icon}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 sm:mt-12 text-center"
        >
          <p className="text-sm sm:text-base text-white/50 italic">
            Click on any certificate to view the full document
          </p>
        </motion.div>
      </div>

      <div className="absolute top-1/4 left-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl opacity-30" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl opacity-30" />
    </section>
  );
}
