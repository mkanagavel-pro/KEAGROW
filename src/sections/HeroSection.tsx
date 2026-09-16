import React from 'react';
import { ArrowUpRight, ChevronDown, Sparkles, Code2, Layers, Cpu } from 'lucide-react';
import { motion } from 'motion/react';
import { HeroCanvas3D } from '../components/HeroCanvas3D';
import { BRAND } from '../data/siteData';

export const HeroSection: React.FC = () => {
  const scrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden border-b border-white/5"
    >
      {/* Ambient background light glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[300px] sm:h-[450px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Subtle coordinate grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Text Content Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Status indicator pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 mb-6 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-semibold">Tamil Nadu, India</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">Modern Digital Agency</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white font-display tracking-tight leading-[1.08] max-w-2xl"
            >
              Grow Your <br />
              <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                Business
              </span>{' '}
              <span className="relative inline-block text-emerald-400">
                With Us.
                <svg
                  className="absolute -bottom-2 left-0 w-full text-emerald-500/30"
                  height="8"
                  viewBox="0 0 100 8"
                  preserveAspectRatio="none"
                >
                  <path d="M0 7 C 20 2, 40 2, 60 4 C 80 6, 90 3, 100 2" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-xl font-normal"
            >
              {BRAND.subline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => scrollTo('contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm sm:text-base tracking-wide transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0"
                id="hero-primary-cta"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => scrollTo('work')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm sm:text-base border border-white/10 transition-colors"
                id="hero-secondary-cta"
              >
                <span>Explore Our Work</span>
              </button>
            </motion.div>

            {/* Engineering Metric Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 w-full max-w-lg"
            >
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-white font-display">Fast</div>
                <div className="text-xs text-slate-400 mt-0.5 font-mono">Performance First</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-display">Custom</div>
                <div className="text-xs text-slate-400 mt-0.5 font-mono">Purpose-Built</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-cyan-400 font-display">Scalable</div>
                <div className="text-xs text-slate-400 mt-0.5 font-mono">Future Ready</div>
              </div>
            </motion.div>
          </div>

          {/* Interactive 3D Geometric Column */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <HeroCanvas3D />
          </div>
        </div>
      </div>

      {/* Down arrow indicator */}
      <button
        onClick={() => scrollTo('about')}
        aria-label="Scroll to about section"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 p-2 rounded-full text-slate-500 hover:text-emerald-400 transition-colors hidden md:block"
      >
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
};
