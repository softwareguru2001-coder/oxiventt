'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Shield, Award, Zap } from 'lucide-react';
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
    gradient: 'from-slate-950/90 via-slate-900/60 to-transparent',
    display_order: 1,
  },
  {
    id: '2',
    title: 'Precision Air Movement Technology',
    subtitle: 'Optimized blade geometry and advanced motors delivering consistent, energy-efficient airflow',
    image_url: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1920',
    gradient: 'from-slate-950/85 via-slate-900/50 to-transparent',
    display_order: 2,
  },
  {
    id: '3',
    title: 'Built to Operate. Built to Last.',
    subtitle: 'Robust construction meeting ISO 27001 standards for every industrial application',
    image_url: 'https://images.pexels.com/photos/534220/pexels-photo-534220.jpeg?auto=compress&cs=tinysrgb&w=1920',
    gradient: 'from-slate-950/90 via-slate-900/55 to-transparent',
    display_order: 3,
  },
  {
    id: '4',
    title: 'Trusted Across India',
    subtitle: '5000+ installations across manufacturing, warehousing, pharma, and commercial sectors',
    image_url: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=1920',
    gradient: 'from-slate-950/85 via-slate-900/50 to-transparent',
    display_order: 4,
  },
];

const badges = [
  { icon: Shield, label: 'ISO 27001 Certified' },
  { icon: Award, label: 'Startup India Recognised' },
  { icon: Zap, label: '5,000+ Installations' },
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
      className="relative w-full h-screen min-h-[680px] max-h-[920px] overflow-hidden bg-slate-950"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <motion.div
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 7.5, ease: 'linear' }}
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Vertical accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-blue-500/60 to-transparent hidden lg:block" />

      {/* Main content */}
      <div className="absolute inset-0 flex flex-col justify-center pt-24 pb-36 sm:pb-40">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${current}`}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="max-w-2xl xl:max-w-3xl"
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-blue-400" />
                <span className="text-blue-400 text-xs font-semibold tracking-[0.2em] uppercase">
                  Oxiventt Industrial Solutions
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] font-bold text-white mb-6 leading-[1.05] tracking-tight">
                {slides[current].title}
              </h1>

              {/* Subtext */}
              <p className="text-base sm:text-lg text-white/70 mb-10 leading-relaxed max-w-xl font-light">
                {slides[current].subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3.5">
                <Link
                  href="/products"
                  className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-gray-900 text-sm font-bold rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-xl shadow-black/30"
                >
                  Explore Products
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white text-sm font-semibold rounded-lg hover:border-white/60 hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
                >
                  Request a Quote
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Trust badges — bottom left */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
          <div className="flex flex-wrap items-center gap-3 sm:gap-5 pb-8">
            {badges.map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-3.5 py-2"
              >
                <badge.icon className="w-3.5 h-3.5 text-blue-300 flex-shrink-0" />
                <span className="text-white/80 text-xs font-medium">{badge.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute right-5 sm:right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2.5 z-20 hidden sm:flex">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`rounded-full transition-all duration-300 ${
              index === current
                ? 'bg-white h-7 w-1.5'
                : 'bg-white/30 hover:bg-white/55 h-1.5 w-1.5'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
        <span className="text-white/30 text-[10px] tabular-nums tracking-widest mt-1.5">
          {String(current + 1).padStart(2, '0')}/{String(slides.length).padStart(2, '0')}
        </span>
      </div>

      {/* Prev/Next */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-lg border border-white/20 bg-black/25 backdrop-blur-sm text-white hover:bg-black/50 hover:border-white/40 transition-all duration-200 flex items-center justify-center"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-16 sm:right-20 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-lg border border-white/20 bg-black/25 backdrop-blur-sm text-white hover:bg-black/50 hover:border-white/40 transition-all duration-200 flex items-center justify-center"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
