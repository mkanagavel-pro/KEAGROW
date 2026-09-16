import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { PROCESS_STAGES } from '../data/siteData';
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProcessSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const currentStep = PROCESS_STAGES[activeStepIndex];

  return (
    <section id="process" className="py-24 sm:py-32 relative border-b border-white/5 bg-[#080c14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Development Lifecycle"
          title="From Idea → Reality"
          subtitle="A structured, transparent six-stage workflow engineered to eliminate ambiguity and deliver predictable excellence."
        />

        {/* Step Indicator Bar */}
        <div className="relative mb-12">
          {/* Connecting Track */}
          <div className="hidden md:block absolute top-1/2 left-4 right-4 h-0.5 bg-white/10 -translate-y-1/2 -z-0" />

          {/* Stepper Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 relative z-10">
            {PROCESS_STAGES.map((stage, idx) => {
              const isActive = activeStepIndex === idx;
              const isPassed = activeStepIndex > idx;

              return (
                <button
                  key={stage.step}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/20 scale-105'
                      : isPassed
                      ? 'bg-[#101725] text-white border-emerald-500/40'
                      : 'bg-[#0e1320] text-slate-400 border-white/5 hover:border-white/20 hover:text-white'
                  }`}
                  id={`process-step-btn-${stage.step}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-xs font-mono font-bold ${
                        isActive ? 'text-slate-950' : isPassed ? 'text-emerald-400' : 'text-slate-400'
                      }`}
                    >
                      STAGE {stage.step}
                    </span>
                    {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <div className="text-sm font-bold font-display truncate">
                    {stage.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Detailed Feature Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="p-8 sm:p-10 rounded-2xl bg-[#0e1422] border border-white/10 shadow-2xl relative overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">
                  <span>Stage {currentStep.step} of 06</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-white font-display mb-4">
                  {currentStep.title}
                </h3>
                <p className="text-lg text-slate-200 leading-relaxed font-normal mb-6">
                  “{currentStep.description}”
                </p>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1 font-semibold">
                    Key Outcome & Deliverables
                  </div>
                  <div className="text-sm text-slate-300">
                    {currentStep.deliverable}
                  </div>
                </div>
              </div>

              {/* Progress Navigation Controls */}
              <div className="md:col-span-4 flex flex-col items-start md:items-end justify-between h-full gap-4 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-white/10 md:pl-8">
                <div className="text-left md:text-right">
                  <span className="text-xs font-mono text-slate-400 block">Milestone Progress</span>
                  <span className="text-3xl font-extrabold text-emerald-400 font-mono">
                    {Math.round(((activeStepIndex + 1) / 6) * 100)}%
                  </span>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button
                    disabled={activeStepIndex === 0}
                    onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                    className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:pointer-events-none text-xs text-white border border-white/5 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    disabled={activeStepIndex === PROCESS_STAGES.length - 1}
                    onClick={() => setActiveStepIndex((prev) => Math.min(PROCESS_STAGES.length - 1, prev + 1))}
                    className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:pointer-events-none text-xs font-bold text-slate-950 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Next Stage</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
