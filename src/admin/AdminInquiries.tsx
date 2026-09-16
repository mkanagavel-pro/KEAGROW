import React, { useEffect, useState } from 'react';
import { Trash2, Mail, Phone, Building2, CheckCircle2, Circle, Send, BadgeCheck } from 'lucide-react';
import { api } from '../lib/api';
import { Inquiry } from '../types';

export const AdminInquiries: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [confirmErrorId, setConfirmErrorId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      setInquiries(await api.getInquiries<Inquiry[]>());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleRead(inquiry: Inquiry) {
    try {
      await api.updateInquiry(inquiry.id, { read: !inquiry.read });
      setInquiries((prev) => prev.map((i) => (i.id === inquiry.id ? { ...i, read: !i.read } : i)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update');
    }
  }

  async function handleConfirm(inquiry: Inquiry) {
    setConfirmingId(inquiry.id);
    setConfirmErrorId(null);
    try {
      const updated = await api.confirmInquiry<Inquiry>(inquiry.id);
      setInquiries((prev) => prev.map((i) => (i.id === inquiry.id ? updated : i)));
    } catch (err) {
      setConfirmErrorId(inquiry.id);
      setError(err instanceof Error ? err.message : 'Failed to send confirmation email');
    } finally {
      setConfirmingId(null);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this inquiry?')) return;
    try {
      await api.deleteInquiry(id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete');
    }
  }

  const unreadCount = inquiries.filter((i) => !i.read).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold font-display">
          Inquiries ({inquiries.length})
          {unreadCount > 0 && (
            <span className="ml-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full align-middle">
              {unreadCount} new
            </span>
          )}
        </h2>
      </div>

      {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

      {loading ? (
        <p className="text-slate-400 text-sm">Loading…</p>
      ) : (
        <div className="grid gap-3">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className={`bg-[#0f1422] border rounded-xl px-5 py-4 ${
                inquiry.read ? 'border-white/10' : 'border-emerald-500/30'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium">{inquiry.name || 'Unnamed'}</p>
                    {inquiry.projectType && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/10">
                        {inquiry.projectType}
                      </span>
                    )}
                    {inquiry.confirmed && (
                      <span className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <BadgeCheck size={12} /> Confirmed
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(inquiry.receivedAt).toLocaleString()}
                    {inquiry.confirmed && inquiry.confirmedAt && (
                      <> · Email sent {new Date(inquiry.confirmedAt).toLocaleString()}</>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => toggleRead(inquiry)}
                    title={inquiry.read ? 'Mark as unread' : 'Mark as read'}
                    className="p-2 text-slate-400 hover:text-emerald-400"
                  >
                    {inquiry.read ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                  </button>
                  <button onClick={() => handleDelete(inquiry.id)} className="p-2 text-slate-400 hover:text-red-400">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-slate-400">
                {inquiry.company && (
                  <span className="flex items-center gap-1.5">
                    <Building2 size={14} /> {inquiry.company}
                  </span>
                )}
                {inquiry.email && (
                  <a href={`mailto:${inquiry.email}`} className="flex items-center gap-1.5 hover:text-emerald-400">
                    <Mail size={14} /> {inquiry.email}
                  </a>
                )}
                {inquiry.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone size={14} /> {inquiry.phone}
                  </span>
                )}
              </div>

              {inquiry.message && (
                <p className="mt-3 text-sm text-slate-300 bg-white/[0.03] border border-white/5 rounded-lg p-3">
                  {inquiry.message}
                </p>
              )}

              <div className="mt-4 flex items-center gap-3">
                {!inquiry.confirmed && (
                  <button
                    onClick={() => handleConfirm(inquiry)}
                    disabled={confirmingId === inquiry.id || !inquiry.email}
                    title={!inquiry.email ? 'No email address on this inquiry' : undefined}
                    className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 transition-colors"
                  >
                    <Send size={14} />
                    {confirmingId === inquiry.id ? 'Sending…' : 'Confirm & Email'}
                  </button>
                )}
                {confirmErrorId === inquiry.id && (
                  <span className="text-xs text-red-400">Couldn't send — check SMTP settings in .env</span>
                )}
              </div>
            </div>
          ))}
          {inquiries.length === 0 && (
            <p className="text-slate-500 text-sm">No inquiries yet — they'll show up here as soon as someone submits the contact form.</p>
          )}
        </div>
      )}
    </div>
  );
};
