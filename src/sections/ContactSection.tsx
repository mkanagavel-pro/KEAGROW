import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { BRAND } from '../data/siteData';
import { Phone, MessageCircle, Mail, Instagram, Send, CheckCircle2, Copy, Check, AlertTriangle } from 'lucide-react';
import { ContactFormData } from '../types';
import { api } from '../lib/api';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: 'Website Development',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [sending, setSending] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSubmitError(false);
    try {
      await api.createInquiry(formData);
      setSubmitted(true);
    } catch {
      // Backend unreachable (e.g. static hosting with no server running).
      // Don't block the visitor — just be honest that it wasn't saved
      // automatically and point them at a direct channel instead.
      setSubmitError(true);
      setSubmitted(true);
    } finally {
      setSending(false);
    }
  };

  const handleCopyPlaceholder = (key: string, value: string) => {
    navigator.clipboard?.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative border-b border-white/5 bg-[#080b12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Direct Channels"
          title="Let’s Build Something That Matters."
          subtitle="Whether you need a modern business website, custom web application, or project solution, we are ready to discuss your goals."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Information Cards with exact placeholders */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white font-display mb-2">
                Connect With KEAGROW
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Reach out directly via our designated channels. Official contact numbers and social handles are currently designated with standard placeholders until final operator release.
              </p>
            </div>

            {/* Channels Grid */}
            <div className="space-y-3">
              {/* Phone */}
              <div className="p-4 rounded-xl bg-[#0f1422] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase font-medium">
                      Phone Call
                    </div>
                    <div className="text-sm font-mono font-semibold text-white">
                      {BRAND.contactPlaceholders.phone}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleCopyPlaceholder('phone', BRAND.contactPlaceholders.phone)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                  aria-label="Copy phone placeholder"
                >
                  {copiedKey === 'phone' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* WhatsApp */}
              <div className="p-4 rounded-xl bg-[#0f1422] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase font-medium">
                      WhatsApp
                    </div>
                    <div className="text-sm font-mono font-semibold text-white">
                      {BRAND.contactPlaceholders.whatsapp}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleCopyPlaceholder('whatsapp', BRAND.contactPlaceholders.whatsapp)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                  aria-label="Copy WhatsApp placeholder"
                >
                  {copiedKey === 'whatsapp' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Email */}
              <div className="p-4 rounded-xl bg-[#0f1422] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase font-medium">
                      Email Inquiries
                    </div>
                    <div className="text-sm font-mono font-semibold text-white">
                      {BRAND.contactPlaceholders.email}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleCopyPlaceholder('email', BRAND.contactPlaceholders.email)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                  aria-label="Copy email placeholder"
                >
                  {copiedKey === 'email' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Instagram */}
              <div className="p-4 rounded-xl bg-[#0f1422] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase font-medium">
                      Instagram
                    </div>
                    <div className="text-sm font-mono font-semibold text-white">
                      {BRAND.contactPlaceholders.instagram}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleCopyPlaceholder('instagram', BRAND.contactPlaceholders.instagram)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                  aria-label="Copy Instagram placeholder"
                >
                  {copiedKey === 'instagram' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Geographical Base */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
                Regional Headquarters
              </div>
              <div className="text-sm text-slate-200 font-medium">
                {BRAND.location}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Serving clients, businesses, and startups throughout Tamil Nadu and worldwide.
              </p>
            </div>
          </div>

          {/* Right Column: Project Enquiry Form */}
          <div className="lg:col-span-7 bg-[#0e1422] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4" id="form-success-message">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
                    submitError
                      ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                      : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                  }`}
                >
                  {submitError ? <AlertTriangle className="w-8 h-8" /> : <CheckCircle2 className="w-8 h-8" />}
                </div>
                <h3 className="text-2xl font-bold text-white font-display">
                  {submitError ? 'Inquiry Not Sent Automatically' : 'Project Inquiry Received'}
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  {submitError
                    ? "We couldn't reach our server just now, so this wasn't saved automatically. Please reach out directly via WhatsApp, phone, or email above and we'll pick it up from there."
                    : 'Thank you for reaching out to KEAGROW. Your inquiry has been recorded and our team will review it shortly.'}
                </p>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 max-w-md mx-auto text-left">
                  <div><strong className="text-emerald-400">Name:</strong> {formData.name || 'Provided'}</div>
                  <div><strong className="text-emerald-400">Company:</strong> {formData.company || 'Not Specified'}</div>
                  <div><strong className="text-emerald-400">Type:</strong> {formData.projectType}</div>
                </div>
                <button
                  onClick={() => { setSubmitted(false); setSubmitError(false); }}
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono font-semibold transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" id="keagrow-project-form">
                <div>
                  <h3 className="text-xl font-bold text-white font-display mb-1">
                    Start a Conversation
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Fill out the form below to outline your requirements.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5 font-medium">
                      Your Name <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-[#141b2b] border border-white/10 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-400 transition-colors"
                      id="input-name"
                    />
                  </div>

                  {/* Business / Company */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5 font-medium">
                      Business / Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Enterprise Ltd."
                      className="w-full px-4 py-3 rounded-xl bg-[#141b2b] border border-white/10 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-400 transition-colors"
                      id="input-company"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5 font-medium">
                      Email Address <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. contact@business.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#141b2b] border border-white/10 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-400 transition-colors"
                      id="input-email"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5 font-medium">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-[#141b2b] border border-white/10 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-400 transition-colors"
                      id="input-phone"
                    />
                  </div>
                </div>

                {/* Project Type */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5 font-medium">
                    Project Type <span className="text-emerald-400">*</span>
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#141b2b] border border-white/10 text-sm text-white focus:outline-none focus:border-emerald-400 transition-colors"
                    id="select-project-type"
                  >
                    <option value="Website Development">Website Development</option>
                    <option value="Custom Software / Applications">Custom Software / Applications</option>
                    <option value="Academic / Project Solutions">Academic / Project Solutions</option>
                    <option value="Additional Creative Support">Additional Creative Support</option>
                    <option value="General Commercial Inquiry">General Commercial Inquiry</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5 font-medium">
                    Project Summary / Message <span className="text-emerald-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Briefly describe your business, timeline, key features, or objectives..."
                    className="w-full px-4 py-3 rounded-xl bg-[#141b2b] border border-white/10 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-400 transition-colors resize-none"
                    id="textarea-message"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-slate-950 font-bold text-sm sm:text-base tracking-wide transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0"
                  id="submit-form-btn"
                >
                  <span>{sending ? 'Sending…' : 'Submit Project Inquiry'}</span>
                  <Send className="w-4 h-4" />
                </button>

                <p className="text-[11px] font-mono text-slate-400 text-center">
                  Enquiry-based consultation • No fixed templates • Tailored technical response
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
