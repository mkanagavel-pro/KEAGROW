import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { TEAM_MEMBERS } from '../data/siteData';
import { User, Code, Shield } from 'lucide-react';

const TeamPortrait: React.FC<{ photo?: string; initials: string; role: string }> = ({
  photo,
  initials,
  role,
}) => {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-[3/4] bg-gradient-to-b from-[#161f30] via-[#101724] to-[#0a0f18] border-b border-white/5 flex items-center justify-center overflow-hidden">
      {photo && !failed ? (
        <img
          src={photo}
          alt=""
          onError={() => setFailed(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <>
          {/* Subtle geometric portrait grid & lighting */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="w-36 h-36 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center relative shadow-inner">
            <span className="text-3xl font-extrabold font-display text-emerald-400/90 tracking-wider">
              {initials}
            </span>
            <div className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-[#080b12] border border-white/10 text-[9px] font-mono text-slate-400">
              Portrait Placeholder
            </div>
          </div>
        </>
      )}

      {/* Role Tag in top right */}
      <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-[#080b12]/80 backdrop-blur-sm text-emerald-400 border border-white/10">
        {role}
      </div>
    </div>
  );
};

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-24 sm:py-32 relative border-b border-white/5 bg-[#090d16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Core Engineering"
          title="Meet the Team"
          subtitle="A dedicated technology team committed to engineering purpose-built digital solutions and practical software."
        />

        {/* 3 Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#0e1320] border border-white/10 hover:border-emerald-500/40 transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-xl"
              id={`team-card-${member.name.toLowerCase()}`}
            >
              <div>
                {/* Portrait: shows the real photo once one exists at the path in siteData.ts,
                    otherwise falls back to this initials placeholder automatically. */}
                <TeamPortrait photo={member.photo} initials={member.initials} role={member.role} />

                {/* Member Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white font-display tracking-tight group-hover:text-emerald-300 transition-colors">
                    {member.name}
                  </h3>
                  <div className="text-xs font-mono text-emerald-400 font-semibold mb-3">
                    Technology & Development
                  </div>

                  {/* Verbatim Bio */}
                  <p className="text-sm text-slate-300 leading-relaxed font-normal mb-6">
                    “{member.bio}”
                  </p>

                  {/* Focus Areas */}
                  <div className="pt-4 border-t border-white/5">
                    <div className="text-[11px] font-mono text-slate-400 uppercase mb-2 font-medium">
                      Core Focus
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {member.specialization.map((spec, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded text-xs font-mono bg-white/[0.03] text-slate-300 border border-white/5"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-3 bg-white/[0.02] border-t border-white/5 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>KEAGROW Team</span>
                <span className="text-emerald-400">Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
