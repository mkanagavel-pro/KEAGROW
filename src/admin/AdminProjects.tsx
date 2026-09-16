import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Pencil, X, ExternalLink } from 'lucide-react';
import { api } from '../lib/api';
import { ProjectItem } from '../types';

const EMPTY: Omit<ProjectItem, 'id'> = {
  title: '',
  category: '',
  tagline: '',
  description: '',
  liveUrl: '',
  isPlaceholder: false,
  statusBadge: 'Project Showcase',
  technologies: [],
  accentColor: '#10b981',
};

export const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [techInput, setTechInput] = useState('');
  const [showForm, setShowForm] = useState(false);

  async function load() {
    setLoading(true);
    try {
      setProjects(await api.getProjects<ProjectItem[]>());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function startNew() {
    setEditingId(null);
    setForm(EMPTY);
    setTechInput('');
    setShowForm(true);
  }

  function startEdit(project: ProjectItem) {
    setEditingId(project.id);
    setForm({ ...project });
    setTechInput(project.technologies.join(', '));
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const payload = {
      ...form,
      technologies: techInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };
    try {
      if (editingId) {
        await api.updateProject(editingId, payload);
      } else {
        await api.createProject(payload);
      }
      setShowForm(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save project');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    try {
      await api.deleteProject(id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project');
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold font-display">Projects ({projects.length})</h2>
        <button
          onClick={startNew}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-[#0f1422] border border-white/10 rounded-2xl p-6 mb-8 grid gap-4 sm:grid-cols-2"
        >
          <div className="sm:col-span-2 flex items-center justify-between">
            <h3 className="font-semibold">{editingId ? 'Edit Project' : 'New Project'}</h3>
            <button type="button" onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white">
              <X size={18} />
            </button>
          </div>

          <Field label="Title">
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="kg-input" />
          </Field>
          <Field label="Category">
            <input required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="kg-input" />
          </Field>
          <Field label="Tagline" full>
            <input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} className="kg-input" />
          </Field>
          <Field label="Description" full>
            <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="kg-input resize-none" />
          </Field>
          <Field label="Live URL (leave blank if none yet)">
            <input value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} className="kg-input" />
          </Field>
          <Field label="Status Badge">
            <select value={form.statusBadge} onChange={(e) => setForm({ ...form, statusBadge: e.target.value })} className="kg-input">
              <option>Live Production</option>
              <option>Live Platform</option>
              <option>Project Showcase</option>
              <option>Coming Soon</option>
            </select>
          </Field>
          <Field label="Technologies (comma separated)" full>
            <input value={techInput} onChange={(e) => setTechInput(e.target.value)} className="kg-input" placeholder="React, Node.js, MongoDB" />
          </Field>
          <Field label="Mark as placeholder (no real project yet)">
            <input
              type="checkbox"
              checked={!!form.isPlaceholder}
              onChange={(e) => setForm({ ...form, isPlaceholder: e.target.checked })}
              className="w-5 h-5 accent-emerald-500"
            />
          </Field>

          <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm rounded-lg border border-white/15 text-slate-300">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold">
              {editingId ? 'Save Changes' : 'Add Project'}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-slate-400 text-sm">Loading…</p>
      ) : (
        <div className="grid gap-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between gap-4 bg-[#0f1422] border border-white/10 rounded-xl px-5 py-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium truncate">{project.title}</p>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/10 shrink-0">
                    {project.statusBadge}
                  </span>
                </div>
                <p className="text-sm text-slate-400 truncate">{project.category}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-emerald-400">
                    <ExternalLink size={16} />
                  </a>
                )}
                <button onClick={() => startEdit(project)} className="p-2 text-slate-400 hover:text-white">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(project.id)} className="p-2 text-slate-400 hover:text-red-400">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {projects.length === 0 && <p className="text-slate-500 text-sm">No projects yet.</p>}
        </div>
      )}

      <style>{`
        .kg-input {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(226,232,240,0.15);
          border-radius: 0.5rem;
          padding: 0.55rem 0.75rem;
          font-size: 0.875rem;
          color: #e2e8f0;
        }
        .kg-input:focus { outline: none; border-color: rgba(16,185,129,0.6); }
      `}</style>
    </div>
  );
};

const Field: React.FC<{ label: string; full?: boolean; children: React.ReactNode }> = ({ label, full, children }) => (
  <label className={`block text-sm text-slate-400 ${full ? 'sm:col-span-2' : ''}`}>
    <span className="mb-1.5 block">{label}</span>
    {children}
  </label>
);
