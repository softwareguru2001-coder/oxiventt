'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  gradient: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Industrial Excellence in Ventilation',
    subtitle: 'High-performance fans engineered for demanding environments',
    gradient: 'from-industrial-900/90 via-industrial-800/80 to-transparent',
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Cutting-Edge Air Movement Technology',
    subtitle: 'Precision-engineered solutions for optimal airflow and energy efficiency',
    gradient: 'from-blue-900/90 via-blue-800/80 to-transparent',
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/534220/pexels-photo-534220.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Built for Industrial Strength',
    subtitle: 'Robust construction meets advanced aerodynamic design',
    gradient: 'from-slate-900/90 via-slate-800/80 to-transparent',
  },
  {
    id: 4,
    image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Trusted Across Industries',
    subtitle: 'Delivering reliable performance for manufacturing, warehousing, and more',
    gradient: 'from-gray-900/90 via-gray-800/80 to-transparent',
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide]);

  return (
    <div
      className="relative w-full h-[75vh] md:h-[85vh] lg:h-[90vh] overflow-hidden bg-industrial-950"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={slides[current].image}
              alt={slides[current].title}
              fill
              priority={current === 0}
              quality={85}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(1920, 1080))}`}
              className="object-cover"
              style={{
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 8000ms ease-in-out',
              }}
            />
          </div>

          <div className={`absolute inset-0 bg-gradient-to-r ${slides[current].gradient}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 md:px-8 lg:px-12 z-10">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="max-w-2xl"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6"
                  >
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Trusted by Industry Leaders
                  </motion.div>

                  <motion.h1
                    className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-[1.1]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    {slides[current].title}
                  </motion.h1>

                  <motion.p
                    className="text-lg md:text-xl lg:text-2xl text-white/95 mb-10 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    {slides[current].subtitle}
                  </motion.p>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  >
                    <Link
                      href="/products"
                      className="group relative inline-flex items-center justify-center px-8 py-4 text-base md:text-lg font-bold text-white overflow-hidden rounded-xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-2xl hover:scale-105"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Explore Products
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>

                    <Link
                      href="/contact"
                      className="group relative inline-flex items-center justify-center px-8 py-4 text-base md:text-lg font-bold text-white overflow-hidden rounded-xl transition-all duration-300 border-2 border-white/30 backdrop-blur-md hover:border-white hover:bg-white/10 hover:scale-105"
                    >
                      <span className="relative z-10">Request Quote</span>
                    </Link>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="hidden lg:grid grid-cols-2 gap-4"
                >
                  {[
                    { icon: '⚡', text: 'Energy Efficient', desc: 'Save up to 40% on power' },
                    { icon: '🔧', text: 'Easy Installation', desc: 'Quick setup & maintenance' },
                    { icon: '🛡️', text: 'Built to Last', desc: '10+ years warranty' },
                    { icon: '🌍', text: 'Global Standards', desc: 'ISO certified quality' },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
                    >
                      <div className="text-3xl mb-3">{feature.icon}</div>
                      <h3 className="text-white font-bold text-lg mb-1">{feature.text}</h3>
                      <p className="text-white/70 text-sm">{feature.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:shadow-glow hover:scale-110 transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:shadow-glow hover:scale-110 transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`rounded-full transition-all duration-300 ${
              index === current
                ? 'bg-white w-12 h-3 shadow-glow'
                : 'bg-white/40 hover:bg-white/60 w-3 h-3'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
