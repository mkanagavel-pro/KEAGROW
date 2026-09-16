import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { TECH_CATEGORIES } from '../data/siteData';
import { Layers, Terminal, Sparkles } from 'lucide-react';

export const TechnologiesSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 relative border-b border-white/5 bg-[#080c14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Technical Stack"
          title="Technologies We Work With"
          subtitle="Our engineering foundation is built on modern, production-proven tools and frameworks. We continuously expand our capabilities as modern web standards evolve."
        />

        {/* Categorized Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECH_CATEGORIES.map((category, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0f1422] border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                  <h3 className="text-base font-bold text-white font-display">
                    {category.title}
                  </h3>
                  <span className="text-[11px] font-mono text-emerald-400">
                    0{idx + 1}
                  </span>
                </div>

                <div className="space-y-3">
                  {category.items.map((tech, tIdx) => (
                    <div
                      key={tIdx}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <span className="text-sm font-semibold text-slate-200">
                        {tech.name}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {tech.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Production Standard</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
