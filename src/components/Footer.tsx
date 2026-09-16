import React from 'react';
import { BRAND } from '../data/siteData';
import { ArrowUp, Instagram, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#05070c] border-t border-white/10 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img src="/logo/keagrow-icon.png" alt="KEAGROW" className="w-8 h-8 object-contain" />
              <span className="text-xl font-extrabold tracking-wider font-display uppercase">
                <span className="text-white">KEA</span>
                <span className="bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
                  GROW
                </span>
              </span>
            </div>
            <p className="text-sm text-slate-300 font-medium">
              “{BRAND.tagline}”
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Building modern websites, custom software solutions and digital experiences designed around real-world business needs.
            </p>

            {/* Social Link (Instagram only, no GitHub/LinkedIn) */}
            <div className="pt-2">
              <a
                href={BRAND.contactPlaceholders.instagramUrl}
                aria-label="KEAGROW on Instagram"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 hover:text-pink-400 transition-colors border border-white/5"
                id="footer-instagram-link"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>{BRAND.contactPlaceholders.instagram}</span>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-mono text-white uppercase font-bold tracking-wider">
              Navigation
            </div>
            <ul className="space-y-2 text-xs font-mono">
              {['Home', 'About', 'Services', 'Work', 'Process', 'Team', 'Contact'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)}
                      className="hover:text-emerald-400 transition-colors inline-block py-0.5"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Direct Placeholders */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-mono text-white uppercase font-bold tracking-wider">
              Contact Channels
            </div>
            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Phone: {BRAND.contactPlaceholders.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>WhatsApp: {BRAND.contactPlaceholders.whatsapp}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Email: {BRAND.contactPlaceholders.email}</span>
              </div>
            </div>
          </div>

          {/* Location Column */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-mono text-white uppercase font-bold tracking-wider">
              Location
            </div>
            <div className="flex items-start gap-2 text-xs leading-relaxed text-slate-300">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Mettur, Salem District,<br />
                Tamil Nadu, India
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>{BRAND.copyright}</div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400">Tamil Nadu • Global Reach</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              aria-label="Scroll back to top"
              id="back-to-top-btn"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
