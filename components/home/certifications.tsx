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
          className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 max-w-3xl mx-auto"
        >
          {certifications.map((cert, index) => (
            <motion.button
              key={index}
              onClick={() => cert.pdfUrl === '/iso.pdf' && window.open(cert.pdfUrl, '_blank', 'noopener,noreferrer')}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className={`group relative p-6 sm:p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/30 hover:bg-white/15 transition-all duration-300 ${cert.pdfUrl !== '/iso.pdf' ? 'cursor-default' : 'cursor-pointer'}`}
              aria-label={`${cert.pdfUrl === '/iso.pdf' ? 'View' : ''} ${cert.title} Certificate`}
            >
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {cert.title === 'ISO 27001 (ISMS)' ? (
                    <>
                      <circle cx="100" cy="100" r="90" fill="#003087" />
                      <circle cx="100" cy="100" r="75" fill="white" />
                      <circle cx="100" cy="100" r="70" fill="none" stroke="#003087" strokeWidth="2" />
                      <text x="100" y="85" textAnchor="middle" fill="#003087" fontSize="28" fontWeight="bold" fontFamily="Arial">
                        ISO
                      </text>
                      <text x="100" y="115" textAnchor="middle" fill="#003087" fontSize="18" fontFamily="Arial">
                        27001
                      </text>
                    </>
                  ) : (
                    <>
                      <rect x="10" y="10" width="180" height="180" rx="10" fill="white" />
                      <text x="20" y="100" fill="#FF6B35" fontSize="24" fontWeight="700" fontFamily="Arial, sans-serif">
                        #startup
                      </text>
                      <text x="110" y="100" fill="#FF6B35" fontSize="24" fontWeight="700" fontFamily="Arial, sans-serif">
                        ind
                      </text>
                      <text x="150" y="100" fill="#4169E1" fontSize="24" fontWeight="700" fontFamily="Arial, sans-serif">
                        i
                      </text>
                      <text x="160" y="100" fill="#FF6B35" fontSize="24" fontWeight="700" fontFamily="Arial, sans-serif">
                        a
                      </text>
                      <path d="M 165 80 L 180 95 L 165 110 Z" fill="#22C55E" />
                    </>
                  )}
                </svg>
              </div>
              {cert.pdfUrl === '/iso.pdf' && (
                <div className="mt-4 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Click to view
                </div>
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>

      <div className="absolute top-1/4 left-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl opacity-30" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl opacity-30" />
    </section>
  );
}
