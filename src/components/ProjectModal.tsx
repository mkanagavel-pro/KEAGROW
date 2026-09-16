import React, { useEffect } from 'react';
import { ProjectItem } from '../types';
import { X, ExternalLink, ShieldCheck, Cpu, Target, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#06080d]/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0d121c] border border-white/10 rounded-2xl shadow-2xl z-10 p-6 sm:p-8 md:p-10 text-slate-200"
          id={`case-study-modal-${project.id}`}
        >
          {/* Header Row */}
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {project.category}
                </span>
                <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-white/5 text-slate-400 border border-white/5">
                  {project.statusBadge}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                {project.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-400 mt-1.5">
                {project.tagline}
              </p>
            </div>
            <button
              onClick={onClose}
              id="close-modal-btn"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/5"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Project Details */}
          <div className="mt-6 space-y-6">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                Project Overview
              </h4>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                {project.description}
              </p>
            </div>

            {/* Case Study Grid */}
            {project.caseStudy && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#111724] border border-white/5">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-wider mb-2 font-semibold">
                    <Target className="w-4 h-4" />
                    <span>The Challenge</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.caseStudy.challenge}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#111724] border border-white/5">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-2 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>The Solution</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.caseStudy.solution}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#111724] border border-white/5">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2 font-semibold">
                    <Cpu className="w-4 h-4" />
                    <span>Technology Stack</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.caseStudy.technology}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#111724] border border-white/5">
                  <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono uppercase tracking-wider mb-2 font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Outcome & Impact</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.caseStudy.outcome}
                  </p>
                </div>
              </div>
            )}

            {/* Tech Badges */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2.5">
                Technologies Utilized
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-colors shadow-lg shadow-emerald-500/20"
                  id={`live-link-${project.id}`}
                >
                  <span>Launch Live Project</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-400">
                  <span>Architecture Prototype • Full Showcase In Progress</span>
                </div>
              )}

              <button
                onClick={onClose}
                className="text-xs sm:text-sm text-slate-400 hover:text-white transition-colors"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
