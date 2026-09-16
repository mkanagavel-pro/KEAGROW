import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { api, setAdminToken } from '../lib/api';

export const AdminLogin: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token } = await api.login(password);
      setAdminToken(token);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#080b11] text-[#e2e8f0] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-[#0f1422] border border-white/10 rounded-2xl p-8 shadow-xl"
      >
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
          <Lock size={20} className="text-emerald-400" />
        </div>
        <h1 className="text-xl font-bold font-display mb-1">KEAGROW Admin</h1>
        <p className="text-sm text-slate-400 mb-6">Sign in to manage projects and inquiries.</p>

        <label className="block text-sm text-slate-400 mb-2">Admin Password</label>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-transparent border border-white/15 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500/60 mb-4"
        />

        {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-slate-950 font-semibold rounded-lg py-2.5 text-sm transition-colors"
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};
