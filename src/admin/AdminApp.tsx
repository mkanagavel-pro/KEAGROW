import React, { useState } from 'react';
import { LayoutGrid, Inbox, LogOut } from 'lucide-react';
import { AdminLogin } from './AdminLogin';
import { AdminProjects } from './AdminProjects';
import { AdminInquiries } from './AdminInquiries';
import { getAdminToken, clearAdminToken } from '../lib/api';

type Tab = 'projects' | 'inquiries';

export default function AdminApp() {
  const [authed, setAuthed] = useState(!!getAdminToken());
  const [tab, setTab] = useState<Tab>('projects');

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />;
  }

  function logout() {
    clearAdminToken();
    setAuthed(false);
  }

  return (
    <div className="min-h-screen bg-[#080b11] text-[#e2e8f0]">
      <header className="border-b border-white/10 bg-[#0a0e17]/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo/keagrow-icon.png" alt="" className="w-7 h-7 object-contain" />
            <span className="font-display font-bold tracking-wide">KEAGROW Admin</span>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white">
            <LogOut size={15} /> Log out
          </button>
        </div>
        <div className="max-w-5xl mx-auto px-6 flex gap-1 -mb-px">
          <TabButton active={tab === 'projects'} onClick={() => setTab('projects')} icon={<LayoutGrid size={15} />}>
            Projects
          </TabButton>
          <TabButton active={tab === 'inquiries'} onClick={() => setTab('inquiries')} icon={<Inbox size={15} />}>
            Inquiries
          </TabButton>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {tab === 'projects' ? <AdminProjects /> : <AdminInquiries />}
      </main>
    </div>
  );
}

const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; children: React.ReactNode }> = ({
  active,
  onClick,
  icon,
  children,
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-3 text-sm border-b-2 transition-colors ${
      active ? 'border-emerald-400 text-white' : 'border-transparent text-slate-400 hover:text-white'
    }`}
  >
    {icon}
    {children}
  </button>
);
