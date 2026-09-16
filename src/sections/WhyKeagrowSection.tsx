import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { WHY_PRINCIPLES } from '../data/siteData';
import { Check, ShieldCheck, Sparkles, Compass, MessageSquare, Award } from 'lucide-react';

export const WhyKeagrowSection: React.FC = () => {
  const [activePrinciple, setActivePrinciple] = useState<string>('01');

  const getPrincipleIcon = (num: string) => {
    switch (num) {
      case '01':
        return Compass;
      case '02':
        return Sparkles;
      case '03':
        return ShieldCheck;
      case '04':
        return MessageSquare;
      case '05':
        return Award;
      default:
        return Check;
    }
  };

  return (
    <section className="py-24 sm:py-32 relative border-b border-white/5 bg-[#090d16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Our Values & Standards"
          title="Why KEAGROW?"
          subtitle="Five core principles guiding every website, application, and project we engineer."
        />

        {/* Interactive 5 Principles Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {WHY_PRINCIPLES.map((principle) => {
            const isActive = activePrinciple === principle.number;
            const Icon = getPrincipleIcon(principle.number);

            return (
              <div
                key={principle.number}
                onMouseEnter={() => setActivePrinciple(principle.number)}
                onClick={() => setActivePrinciple(principle.number)}
                className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
                  isActive
                    ? 'bg-[#121927] border-emerald-500/40 shadow-xl shadow-emerald-500/5 -translate-y-1'
                    : 'bg-[#0e1320] border-white/5 hover:border-white/15'
                }`}
                id={`why-principle-${principle.number}`}
              >
                <div>
                  {/* Number Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`text-2xl font-extrabold font-mono transition-colors ${
                        isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {principle.number}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-white/5 text-slate-400 group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-lg sm:text-xl font-bold font-display mb-3 transition-colors ${
                      isActive ? 'text-white' : 'text-slate-200 group-hover:text-white'
                    }`}
                  >
                    {principle.title}
                  </h3>

                  {/* Verbatim Description */}
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    “{principle.description}”
                  </p>
                </div>

                {/* Micro detail line */}
                <div className="pt-6 mt-6 border-t border-white/5">
                  <span className="text-[11px] font-mono text-emerald-400/90 block">
                    {principle.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
