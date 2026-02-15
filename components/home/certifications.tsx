'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const certifications = [
  {
    title: 'ISO 27001 (ISMS)',
    pdfUrl: '/iso.pdf',
    logo: '/iso-logo.svg',
  },
  {
    title: 'Startup India',
    pdfUrl: '/startupind.pdf',
    logo: '/startup-india-logo.svg',
  },
];

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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Our Certifications
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto px-4">
            Recognized for quality and excellence in industrial ventilation manufacturing
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 max-w-5xl mx-auto"
        >
          <motion.button
            onClick={() => window.open('/iso.pdf', '_blank', 'noopener,noreferrer')}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center gap-6 px-8 py-6 rounded-2xl bg-industrial-800/50 backdrop-blur-md border border-white/10 hover:border-blue-400/50 hover:bg-industrial-800/70 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-blue-500/20"
            aria-label="View ISO 27001 Certificate"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-xl flex-shrink-0">
              <div className="w-[82%] h-[82%] rounded-full bg-white flex items-center justify-center">
                <div className="text-center leading-none">
                  <div className="text-blue-700 text-base sm:text-lg font-black">ISO</div>
                  <div className="text-blue-700 text-xs sm:text-sm font-bold mt-0.5">27001</div>
                </div>
              </div>
            </div>
            <div className="text-left pr-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                ISO 27001(ISMS)
              </h3>
              <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                Click to view certificate
              </p>
            </div>
          </motion.button>

          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className="group relative flex items-center gap-6 px-8 py-6 rounded-2xl bg-industrial-800/50 backdrop-blur-md border border-white/10 hover:border-orange-400/50 hover:bg-industrial-800/70 transition-all duration-300 shadow-lg hover:shadow-orange-500/20"
            aria-label="Startup India Certificate"
          >
            <div className="w-24 h-16 sm:w-28 sm:h-20 bg-white rounded-xl flex items-center justify-center p-2 shadow-xl flex-shrink-0">
              <img
                src="/image copy copy copy copy copy.png"
                alt="Startup India"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-left pr-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-orange-300 transition-colors">
                Startup India
              </h3>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute top-1/4 left-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl opacity-30" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl opacity-30" />
    </section>
  );
}
