'use client';

import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';

interface CertificationBadgeProps {
  title: string;
  description: string;
  pdfUrl: string;
  icon?: React.ReactNode;
  className?: string;
}

export function CertificationBadge({
  title,
  description,
  pdfUrl,
  icon,
  className = '',
}: CertificationBadgeProps) {
  const handleClick = () => {
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative w-full text-left ${className}`}
      aria-label={`View ${title} certificate`}
    >
      <div className="relative p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-blue-300 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 backdrop-blur-sm">
            {icon || <Award className="w-8 h-8 sm:w-10 sm:h-10" />}
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-blue-300 transition-colors duration-300">
            {title}
          </h3>

          <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-4">
            {description}
          </p>

          <div className="flex items-center gap-2 text-sm text-blue-300 font-medium">
            <span>View Certificate</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </div>
        </div>

        <div className="absolute inset-0 rounded-xl sm:rounded-2xl ring-1 ring-inset ring-white/5 group-hover:ring-white/20 transition-all duration-500" />
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 group-hover:shadow-glow transition-all duration-500" />
      </div>
    </motion.button>
  );
}
