import React from 'react';
import { Layout, Shirt, Film, ArrowRight } from 'lucide-react';
import { CREATIVE_SERVICES } from '../data/siteData';

export const CreativeSupportSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout':
        return Layout;
      case 'Shirt':
        return Shirt;
      case 'Film':
        return Film;
      default:
        return Layout;
    }
  };

  return (
    <section className="py-16 sm:py-20 relative border-b border-white/5 bg-[#080b12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-white/5 text-slate-400 border border-white/10 mb-2.5">
              <span>Supplemental Offerings</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              More Creative Support
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md font-normal">
            Complementary creative services to support your brand communication across digital campaigns, physical merchandising, and promotional media.
          </p>
        </div>

        {/* 3 Secondary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CREATIVE_SERVICES.map((service, idx) => {
            const IconComponent = getIcon(service.iconName);
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#0c101a] border border-white/5 hover:border-white/15 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-white/5 text-slate-300 flex items-center justify-center mb-4">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white font-display mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <div className="text-[11px] font-mono text-slate-400 uppercase mb-2">
                    Key Deliverables
                  </div>
                  <div className="space-y-1">
                    {service.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="text-xs text-slate-300 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-slate-500" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
