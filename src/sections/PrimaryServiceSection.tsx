import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { BRAND } from '../data/siteData';
import { Monitor, Tablet, Smartphone, Check, ArrowRight, Gauge, Shield, Search, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export const PrimaryServiceSection: React.FC = () => {
  const [activeViewport, setActiveViewport] = useState<ViewportMode>('desktop');

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-24 sm:py-32 relative border-b border-white/5 bg-[#080c14]">
      {/* Ambient background accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Primary Core Service"
          title={BRAND.primaryService.title}
          subtitle={BRAND.primaryService.description}
        />

        {/* Feature Overview + Interactive Viewport Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Core Value Propositions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#0e1320] border border-emerald-500/20 shadow-lg">
              <div className="text-xs font-mono text-emerald-400 font-semibold tracking-wider uppercase mb-2">
                Why Website Development Matters
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Your website is the single most important digital touchpoint for your company. We architect bespoke, high-conversion web experiences crafted specifically for your target audience, commercial goals, and brand stature.
              </p>
            </div>

            {/* Benefit Checkpoints */}
            <div className="space-y-3.5">
              {[
                {
                  title: 'Tailored Brand Design',
                  desc: 'Crafted from the ground up without rigid generic templates.',
                  icon: Sparkles,
                },
                {
                  title: 'Cross-Device Responsiveness',
                  desc: 'Engineered for seamless fidelity on mobile, tablet, and widescreen.',
                  icon: Monitor,
                },
                {
                  title: 'Ultra-Fast Performance',
                  desc: 'Optimized assets and modern bundlers for rapid load speeds.',
                  icon: Gauge,
                },
                {
                  title: 'Search & Metadata Optimization',
                  desc: 'Semantic markup and Open Graph metadata for natural search visibility.',
                  icon: Search,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-md shadow-emerald-500/20 hover:-translate-y-0.5"
              id="start-website-project-btn"
            >
              <span>Build Your Website</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column: Interactive Multi-Device Simulation Canvas */}
          <div className="lg:col-span-7">
            <div className="bg-[#0e1320] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl">
              {/* Simulator Controls */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline">
                    keagrow.preview/website-architecture
                  </span>
                </div>

                {/* Viewport switchers */}
                <div className="flex items-center bg-white/5 rounded-lg p-1 border border-white/5">
                  <button
                    onClick={() => setActiveViewport('desktop')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-all ${
                      activeViewport === 'desktop'
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Desktop</span>
                  </button>
                  <button
                    onClick={() => setActiveViewport('tablet')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-all ${
                      activeViewport === 'tablet'
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Tablet className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Tablet</span>
                  </button>
                  <button
                    onClick={() => setActiveViewport('mobile')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-all ${
                      activeViewport === 'mobile'
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Mobile</span>
                  </button>
                </div>
              </div>

              {/* Viewport Frame Container */}
              <div className="flex justify-center items-center min-h-[380px] sm:min-h-[420px] bg-[#090d15] rounded-xl p-4 sm:p-6 border border-white/5 overflow-hidden transition-all duration-300">
                <motion.div
                  key={activeViewport}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`bg-[#121826] border border-white/10 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ${
                    activeViewport === 'desktop'
                      ? 'w-full max-w-full'
                      : activeViewport === 'tablet'
                      ? 'w-[80%] max-w-[480px]'
                      : 'w-[62%] max-w-[320px]'
                  }`}
                >
                  {/* Simulated App Header */}
                  <div className="h-10 bg-[#182133] border-b border-white/10 px-3.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-emerald-400 text-slate-950 font-bold flex items-center justify-center text-[9px]">
                        K
                      </div>
                      <span className="font-semibold text-white text-[11px] font-display">
                        Client Business
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {activeViewport === 'desktop' ? (
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                          <span>Home</span>
                          <span>Services</span>
                          <span>Contact</span>
                        </div>
                      ) : (
                        <div className="w-3.5 h-2.5 flex flex-col justify-between">
                          <span className="w-full h-0.5 bg-slate-400 rounded"></span>
                          <span className="w-full h-0.5 bg-slate-400 rounded"></span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Simulated Hero Body */}
                  <div className="p-5 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span className="text-[10px] font-mono text-emerald-400">
                        Live Preview • Responsive
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white font-display leading-tight">
                      Elevate Your Business Presence With Modern Architecture
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Custom websites engineered for speed, clean UX, and seamless customer interactions across all devices.
                    </p>

                    {/* Simulated Cards Grid */}
                    <div className={`grid gap-2.5 pt-2 ${activeViewport === 'desktop' ? 'grid-cols-3' : activeViewport === 'tablet' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                      <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-[11px]">
                        <div className="text-emerald-400 font-semibold mb-0.5">High Speed</div>
                        <div className="text-[10px] text-slate-400">Sub-second response</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-[11px]">
                        <div className="text-cyan-400 font-semibold mb-0.5">Adaptive</div>
                        <div className="text-[10px] text-slate-400">Auto layout flow</div>
                      </div>
                      {activeViewport !== 'mobile' && (
                        <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-[11px]">
                          <div className="text-indigo-400 font-semibold mb-0.5">SEO Primed</div>
                          <div className="text-[10px] text-slate-400">Social ready metadata</div>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 flex items-center justify-between text-[11px]">
                      <div className="px-3 py-1.5 rounded-md bg-emerald-500 text-slate-950 font-bold text-[10px]">
                        Contact Us
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {activeViewport === 'desktop'
                          ? 'Widescreen (1440px)'
                          : activeViewport === 'tablet'
                          ? 'Tablet View (768px)'
                          : 'Mobile View (375px)'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Footer Note */}
              <div className="mt-4 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Adaptive Grid Layouts</span>
                <span className="text-emerald-400">100% Custom Tailored</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
