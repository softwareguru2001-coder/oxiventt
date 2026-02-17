'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  gradient: string;
  display_order: number;
}

interface HeroSliderProps {
  slides?: Slide[];
}

const defaultSlides: Slide[] = [
  {
    id: '1',
    title: 'Industrial Ventilation Engineered for Excellence',
    subtitle: 'High-performance fans built for demanding environments — from textile mills to chemical plants',
    image_url: 'https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=1920',
    gradient: 'from-slate-950/85 via-slate-900/50 to-transparent',
    display_order: 1,
  },
  {
    id: '2',
    title: 'Precision Air Movement Technology',
    subtitle: 'Optimized blade geometry and advanced motors delivering consistent, energy-efficient airflow',
    image_url: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1920',
    gradient: 'from-slate-950/80 via-slate-900/45 to-transparent',
    display_order: 2,
  },
  {
    id: '3',
    title: 'Built to Operate. Built to Last.',
    subtitle: 'Robust construction meeting ISO 27001 standards for every industrial application',
    image_url: 'https://images.pexels.com/photos/534220/pexels-photo-534220.jpeg?auto=compress&cs=tinysrgb&w=1920',
    gradient: 'from-slate-950/85 via-slate-900/50 to-transparent',
    display_order: 3,
  },
  {
    id: '4',
    title: 'Trusted Across India',
    subtitle: '5000+ installations across manufacturing, warehousing, pharma, and commercial sectors',
    image_url: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=1920',
    gradient: 'from-slate-950/80 via-slate-900/45 to-transparent',
    display_order: 4,
  },
];

export function HeroSlider({ slides: propSlides }: HeroSliderProps = {}) {
  const slides = propSlides && propSlides.length > 0 ? propSlides : defaultSlides;
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide]);

  return (
    <div
      className="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden bg-slate-950"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <motion.div
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 7, ease: 'linear' }}
            className="absolute inset-0"
          >
            <Image
              src={slides[current].image_url}
              alt={slides[current].title}
              fill
              priority={current === 0}
              quality={90}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
          <div className={`absolute inset-0 bg-gradient-to-r ${slides[current].gradient}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/25" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col justify-end pb-20 sm:pb-24 md:pb-28 lg:pb-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${current}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
              className="max-w-2xl xl:max-w-3xl"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-7 bg-white/50" />
                <span className="text-white/60 text-xs font-medium tracking-[0.18em] uppercase">
                  Oxiventt — Industrial Ventilation
                </span>
              </div>

              <h1 className="text-[2rem] sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold text-white mb-5 leading-[1.07] tracking-tight">
                {slides[current].title}
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-white/75 mb-8 leading-relaxed max-w-lg">
                {slides[current].subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/products"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-gray-900 text-sm font-semibold rounded-full hover:bg-gray-100 transition-all duration-200"
                >
                  Explore Products
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-7 py-3.5 border border-white/25 text-white text-sm font-medium rounded-full hover:border-white/50 hover:bg-white/8 transition-all duration-200"
                >
                  Request Quote
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`rounded-full transition-all duration-300 ${
              index === current
                ? 'bg-white w-7 h-1.5'
                : 'bg-white/30 hover:bg-white/50 w-1.5 h-1.5'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/15 bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 hover:border-white/30 transition-all duration-200 flex items-center justify-center"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4.5 h-4.5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/15 bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 hover:border-white/30 transition-all duration-200 flex items-center justify-center"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4.5 h-4.5" />
      </button>

      <div className="absolute bottom-8 right-5 sm:right-8 z-20 hidden sm:block">
        <span className="text-white/35 text-xs tabular-nums tracking-widest">
          {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}
