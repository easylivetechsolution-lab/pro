import React from 'react';
import { ArrowRight, Quote, Sparkles, Award } from 'lucide-react';
import { TEAM_MEMBERS } from '../data';
import { TeamMember } from '../types';

interface OurPeopleProps {
  onExploreTeam: () => void;
  onSelectMember: (member: TeamMember) => void;
}

export const OurPeople: React.FC<OurPeopleProps> = ({
  onExploreTeam,
  onSelectMember,
}) => {
  return (
    <section id="people" className="py-20 lg:py-28 bg-[#05140d] text-white relative overflow-hidden border-t border-[#c39953]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <h2
              id="people-heading"
              className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight font-serif"
            >
              Meet the People
              <br />
              Behind the Land
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Experts, innovators, stewards. Our team brings decades of field experience,
              microbiological research, and a shared passion for sustainable agriculture.
            </p>
          </div>

          <div>
            <button
              id="our-team-btn"
              onClick={onExploreTeam}
              className="px-5 py-2.5 rounded-full bg-[#0d281a] hover:bg-[#133827] border border-[#c39953]/40 text-[#d8b06d] hover:text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 group whitespace-nowrap"
            >
              <span>Our Team</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 4 Team Member Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={member.name}
              id={`team-member-${idx}`}
              onClick={() => onSelectMember(member)}
              className="group relative rounded-2xl overflow-hidden bg-[#092217] border border-[#22c55e]/20 hover:border-[#c39953] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
            >
              {/* Photo */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#061810]">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#092217] via-transparent to-transparent" />
              </div>

              {/* Details */}
              <div className="p-4 space-y-1">
                <h3 className="text-base font-bold text-white group-hover:text-[#d8b06d] transition-colors font-serif">
                  {member.name}
                </h3>
                <p className="text-xs font-medium text-emerald-400">
                  {member.role}
                </p>
                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed pt-1">
                  {member.credentials}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Quote Card (As shown in mockup) */}
        <div className="p-8 rounded-3xl bg-[#092217] border border-[#c39953]/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#c39953]/5 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-start gap-4 max-w-3xl">
            <div className="w-12 h-12 rounded-2xl bg-[#133d28] flex items-center justify-center text-[#d8b06d] flex-shrink-0">
              <Quote className="w-6 h-6 fill-current" />
            </div>
            <div className="space-y-2">
              <p className="text-lg sm:text-xl font-medium text-white italic font-serif leading-relaxed">
                "Agriculture isn't just about growing crops; it's about growing opportunities."
              </p>
              <p className="text-xs text-[#d8b06d] font-semibold uppercase tracking-wider">
                — James Miller, Farm Manager
              </p>
            </div>
          </div>

          <div className="flex-shrink-0">
            <span className="px-4 py-2 rounded-full bg-[#133827] text-xs font-mono text-emerald-300 border border-[#22c55e]/30 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#d8b06d]" />
              25+ Years Certified Stewardship
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
