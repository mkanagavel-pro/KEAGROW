import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { BRAND } from '../data/siteData';
import { Terminal, Lightbulb, Compass, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 relative border-b border-white/5 bg-[#0a0e17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="About KEAGROW"
          title="Built to Turn Ideas Into Digital Experiences."
          subtitle="A technology-driven company combining software engineering, responsive design, and business clarity."
        />

        {/* Narrative & Visual Treatment Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Statement Card */}
          <div className="lg:col-span-7 bg-[#0f1422] border border-white/10 rounded-2xl p-8 sm:p-10 flex flex-col justify-between shadow-xl relative overflow-hidden group">
            {/* Subtle glow accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-3 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Our Engineering Philosophy</span>
              </div>

              {/* Exact user copy prominently styled */}
              <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-normal">
                {BRAND.aboutCopy}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-xs font-mono text-emerald-400 font-semibold mb-1">Tailored</div>
                <div className="text-xs text-slate-400">Zero template lock-in</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-xs font-mono text-cyan-400 font-semibold mb-1">Responsive</div>
                <div className="text-xs text-slate-400">Desktop, tablet, mobile</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 col-span-2 sm:col-span-1">
                <div className="text-xs font-mono text-indigo-400 font-semibold mb-1">Practical</div>
                <div className="text-xs text-slate-400">Engineered for results</div>
              </div>
            </div>
          </div>

          {/* Three Pillars Bento Column */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Card 1: Technology Driven */}
            <div className="p-6 rounded-2xl bg-[#0f1422] border border-white/10 hover:border-emerald-500/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white font-display mb-1.5">
                Technology + Modern Architecture
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Utilizing modern web frameworks, component architectures, and robust databases to produce fast, reliable digital solutions.
              </p>
            </div>

            {/* Card 2: Creativity & Usability */}
            <div className="p-6 rounded-2xl bg-[#0f1422] border border-white/10 hover:border-cyan-500/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white font-display mb-1.5">
                Creative Problem Solving
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Transforming complex commercial requirements into clean, approachable user interfaces that guide customers seamlessly.
              </p>
            </div>

            {/* Card 3: Continuous Evolution */}
            <div className="p-6 rounded-2xl bg-[#0f1422] border border-white/10 hover:border-indigo-500/30 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white font-display mb-1.5">
                Continuous Evolution
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Expanding our technical capabilities continuously to integrate cutting-edge industry practices and emerging digital standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
