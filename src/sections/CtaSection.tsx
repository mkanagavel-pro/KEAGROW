import React from 'react';
import { ArrowUpRight, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const CtaSection: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-[#070a10] border-b border-white/5">
      {/* Dynamic background lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-emerald-500/15 via-cyan-500/10 to-indigo-500/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative cyber grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Collaboration & Development</span>
        </div>

        {/* Verbatim Heading */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-[1.1] max-w-3xl mx-auto">
          Have an Idea? <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Let’s Grow It Together.
          </span>
        </h2>

        {/* Verbatim Supporting Text */}
        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Tell us what you’re building, and let’s turn your idea into a digital experience that works for your business.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => scrollTo('contact')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base tracking-wide transition-all shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0"
            id="cta-start-project-main"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => scrollTo('work')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-base border border-white/10 transition-colors"
            id="cta-explore-work-main"
          >
            <span>Explore Our Work</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-12 text-xs font-mono text-slate-400 flex items-center justify-center gap-6">
          <span>• Direct Consultation</span>
          <span>• Tailored Roadmap</span>
          <span>• Transparent Execution</span>
        </div>
      </div>
    </section>
  );
};
