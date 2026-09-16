import React, { useEffect, useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { ProjectModal } from '../components/ProjectModal';
import { PROJECTS } from '../data/siteData';
import { ProjectItem } from '../types';
import { api } from '../lib/api';
import { ExternalLink, ArrowUpRight, Sparkles, Layers, ArrowRight, Eye } from 'lucide-react';

export const SelectedWorkSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  // Starts from the static seed so the section renders immediately;
  // swapped for live data from the admin-managed backend once it loads.
  const [projects, setProjects] = useState<ProjectItem[]>(PROJECTS);

  useEffect(() => {
    api
      .getProjects<ProjectItem[]>()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setProjects(data);
      })
      .catch(() => {
        // Backend not running (e.g. static hosting) — keep the static seed.
      });
  }, []);

  return (
    <section id="work" className="py-24 sm:py-32 relative border-b border-white/5 bg-[#090d16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <SectionHeading
            badge="Portfolio"
            title="Selected Work"
            subtitle="Explore our live production deployments and modern software engineering showcases."
            className="mb-0"
          />
          <div className="text-xs font-mono text-slate-400 bg-white/5 px-4 py-2 rounded-full border border-white/10 self-start md:self-auto">
            <span>{projects.length} Featured Initiatives</span>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            return (
              <div
                key={project.id}
                className="group rounded-2xl bg-[#0f1422] border border-white/10 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:-translate-y-1.5"
                id={`project-card-${project.id}`}
              >
                {/* Visual Preview Banner */}
                <div className="relative h-48 sm:h-52 bg-gradient-to-br from-[#141b2b] to-[#0b0f19] border-b border-white/5 p-6 flex flex-col justify-between overflow-hidden">
                  {/* Subtle Geometric Graphic / Device Frame Simulation */}
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity flex items-center justify-center pointer-events-none">
                    <div className="w-36 h-36 rounded-full border border-emerald-400/30 -mr-16" />
                    <div className="w-48 h-48 rounded-full border border-cyan-400/20" />
                  </div>

                  <div className="flex items-center justify-between relative z-10">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-white/10 text-emerald-300 border border-white/10">
                      {project.category}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        project.isPlaceholder
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      }`}
                    >
                      {project.statusBadge}
                    </span>
                  </div>

                  {/* Visual Project Title Watermark */}
                  <div className="relative z-10">
                    <div className="text-xl sm:text-2xl font-bold text-white font-display tracking-tight group-hover:text-emerald-300 transition-colors">
                      {project.title}
                    </div>
                    <div className="text-xs text-slate-400 mt-1 line-clamp-1">
                      {project.tagline}
                    </div>
                  </div>
                </div>

                {/* Project Body Info */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-slate-300 leading-relaxed line-clamp-3 mb-6 font-normal">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.slice(0, 4).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-slate-400 border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-slate-500 border border-white/5">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-emerald-400 transition-colors"
                      id={`case-study-btn-${project.id}`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Case Study</span>
                    </button>

                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-sm"
                        id={`view-live-btn-${project.id}`}
                      >
                        <span>View Project</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-slate-200"
                      >
                        <span>Preview Scope</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
