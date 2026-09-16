import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { SERVICE_CATEGORIES } from '../data/siteData';
import { Globe, Server, GraduationCap, CheckCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const WhatWeBuildSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('01');

  const getCategoryIcon = (num: string) => {
    switch (num) {
      case '01':
        return Globe;
      case '02':
        return Server;
      case '03':
        return GraduationCap;
      default:
        return Globe;
    }
  };

  const currentCategory = SERVICE_CATEGORIES.find((c) => c.number === selectedCategory) || SERVICE_CATEGORIES[0];
  const IconComponent = getCategoryIcon(currentCategory.number);

  return (
    <section className="py-24 sm:py-32 relative border-b border-white/5 bg-[#0a0e18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Product & Solution Scope"
          title="What We Build"
          subtitle="From high-conversion commercial websites to full-stack database software and academic project solutions."
        />

        {/* Category Navigation Pills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
          {SERVICE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.number;
            const CatIcon = getCategoryIcon(cat.number);
            return (
              <button
                key={cat.number}
                onClick={() => setSelectedCategory(cat.number)}
                className={`p-5 rounded-2xl text-left transition-all border flex items-start justify-between group ${
                  isSelected
                    ? 'bg-[#121927] border-emerald-500/40 shadow-lg shadow-emerald-500/10'
                    : 'bg-[#0f1422] border-white/5 hover:border-white/10 hover:bg-[#111726]'
                }`}
                id={`what-we-build-tab-${cat.number}`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-emerald-400 font-bold">
                      CATEGORY {cat.number}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-display group-hover:text-emerald-300 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                    {cat.tagline}
                  </p>
                </div>
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-white/5 text-slate-400 group-hover:text-white'
                  }`}
                >
                  <CatIcon className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Category Content Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory.number}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="p-8 sm:p-10 rounded-2xl bg-[#0f1422] border border-white/10 relative overflow-hidden"
          >
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wider uppercase">
                    CATEGORY {currentCategory.number}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                    {currentCategory.title}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-slate-400 max-w-md font-normal">
                {currentCategory.tagline}
              </p>
            </div>

            {/* Note specifically for Category 03: Professional Academic & Project Solutions wording */}
            {currentCategory.note && (
              <div className="mb-8 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-slate-200 text-sm leading-relaxed flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-emerald-300">Professional Project Engineering: </span>
                  {currentCategory.note}
                </div>
              </div>
            )}

            {/* Grid of Deliverables */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {currentCategory.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-4 rounded-xl bg-[#131a29] border border-white/5 hover:border-emerald-500/30 hover:bg-[#162033] transition-all group"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
                  <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom action trigger */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-mono text-slate-400">
                Ready to build one of these solutions for your business?
              </span>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group"
              >
                <span>Request a tailored scope & timeline</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
