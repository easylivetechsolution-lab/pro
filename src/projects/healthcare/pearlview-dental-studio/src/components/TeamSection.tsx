import React, { useState } from 'react';
import { Award, GraduationCap, ArrowRight, RotateCw, CheckCircle2 } from 'lucide-react';
import { DOCTORS_DATA } from '../data/dentalData';
import { type Doctor } from '../types';

interface TeamSectionProps {
  onBookWithDoctor: (doctorId: string) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onBookWithDoctor }) => {
  const [flippedDoctorId, setFlippedDoctorId] = useState<string | null>(null);

  const featuredDoctor = DOCTORS_DATA.find((doc) => doc.isFeatured) || DOCTORS_DATA[0];
  const otherDoctors = DOCTORS_DATA.filter((doc) => !doc.isFeatured);

  const toggleDoctorFlip = (id: string) => {
    setFlippedDoctorId(flippedDoctorId === id ? null : id);
  };

  const accreditations = [
    { title: 'Board Certified', desc: 'Highest standard of dental excellence' },
    { title: 'Member, ADA', desc: 'American Dental Association accredited' },
    { title: 'Member, AAID', desc: 'American Academy of Implant Dentistry' },
    { title: 'Continuing Education', desc: '200+ hours yearly advanced aesthetic training' },
  ];

  return (
    <section id="team" className="py-20 lg:py-28 bg-[#FAF9F6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5B7980] mb-2">
            <span>Our Team</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#0E282E] tracking-tight">
            Experienced. Trusted. Caring.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600">
            Our team of skilled professionals is committed to providing exceptional care with a genuine personal touch and unmatched clinical precision.
          </p>
        </div>

        {/* Team Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Featured Doctor: Dr. Michael Carter (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="perspective-1000 h-[520px]">
              <div
                className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${
                  flippedDoctorId === featuredDoctor.id ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front of Featured Card */}
                <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-xl border border-zinc-200/90 bg-white flex flex-col justify-end backface-hidden group">
                  <img
                    src={featuredDoctor.image}
                    alt={featuredDoctor.name}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#0E282E]/95 via-[#0E282E]/40 to-transparent" />

                  {/* Flip Prompt Badge */}
                  <button
                    onClick={() => toggleDoctorFlip(featuredDoctor.id)}
                    className="absolute top-4 right-4 z-10 flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium border border-white/30 hover:bg-white/30 transition-colors"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>View Credentials</span>
                  </button>

                  {/* Content on Bottom */}
                  <div className="relative z-10 p-6 sm:p-8 text-white">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#D4AF37]/90 text-[#0E282E] text-[11px] font-bold tracking-wider uppercase mb-2">
                      Clinical Director
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-1">
                      {featuredDoctor.name}
                    </h3>
                    <p className="text-sm text-zinc-300 font-medium mb-3">
                      {featuredDoctor.title} &bull; {featuredDoctor.experience}
                    </p>

                    <p className="text-xs text-zinc-200 italic font-serif leading-relaxed line-clamp-2 mb-4">
                      &ldquo;{featuredDoctor.philosophy}&rdquo;
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-white/20">
                      <span className="font-serif italic text-sm text-[#EAD8B7]">
                        {featuredDoctor.signature || featuredDoctor.name}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onBookWithDoctor(featuredDoctor.id);
                        }}
                        className="px-4 py-2 text-xs font-semibold text-[#0E282E] bg-white hover:bg-[#EAD8B7] rounded-full transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Book with Dr. Carter</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Back of Featured Card (3D Flipped) */}
                <div className="absolute inset-0 w-full h-full rounded-3xl p-8 bg-[#0E282E] text-white border border-[#1A3E46] shadow-2xl flex flex-col justify-between backface-hidden rotate-y-180">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                      <span className="text-xs uppercase font-bold tracking-wider text-[#D4AF37]">
                        Doctor Credentials & Philosophy
                      </span>
                      <button
                        onClick={() => toggleDoctorFlip(featuredDoctor.id)}
                        className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20"
                      >
                        <RotateCw className="w-4 h-4" />
                      </button>
                    </div>

                    <h4 className="text-2xl font-serif text-white mb-1">{featuredDoctor.name}</h4>
                    <p className="text-xs text-[#EAD8B7] font-semibold mb-4">{featuredDoctor.title}</p>

                    <div className="space-y-4 text-xs text-zinc-300">
                      <div className="flex items-start gap-2.5">
                        <GraduationCap className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white block">Education & Fellowship</strong>
                          <span>{featuredDoctor.education}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <Award className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white block">Clinical Specialty</strong>
                          <span>{featuredDoctor.specialty}</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <strong className="text-white block mb-1">Doctor's Philosophy</strong>
                        <p className="italic text-zinc-300 leading-relaxed font-serif">
                          &ldquo;{featuredDoctor.philosophy}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onBookWithDoctor(featuredDoctor.id)}
                    className="w-full py-3 bg-[#EAD8B7] hover:bg-white text-[#0E282E] font-semibold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Consultation with Dr. Carter</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Associate Specialists Grid + Accreditations (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* 3 Specialists Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {otherDoctors.map((doc: Doctor) => {
                const isFlipped = flippedDoctorId === doc.id;
                return (
                  <div key={doc.id} className="perspective-1000 h-[340px]">
                    <div
                      className={`relative w-full h-full duration-700 transform-style-3d transition-transform cursor-pointer ${
                        isFlipped ? 'rotate-y-180' : ''
                      }`}
                      onClick={() => toggleDoctorFlip(doc.id)}
                    >
                      {/* Front */}
                      <div className="absolute inset-0 w-full h-full bg-white rounded-2xl border border-zinc-200/90 shadow-2xs overflow-hidden flex flex-col backface-hidden group">
                        <div className="relative h-44 w-full overflow-hidden bg-zinc-100">
                          <img
                            src={doc.image}
                            alt={doc.name}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          />
                          <button
                            type="button"
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-xs text-zinc-700 shadow-2xs hover:bg-white"
                            title="Flip for bio"
                          >
                            <RotateCw className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-serif font-bold text-[#0E282E] text-base leading-tight">
                              {doc.name}
                            </h4>
                            <p className="text-xs text-zinc-600 font-medium mt-0.5">
                              {doc.title}
                            </p>
                            <span className="inline-block mt-1 text-[11px] text-[#5B7980] font-semibold">
                              {doc.experience}
                            </span>
                          </div>
                          <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] text-[#0E282E] font-semibold">
                            <span>Bio & degrees</span>
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>

                      {/* Back */}
                      <div className="absolute inset-0 w-full h-full bg-[#0E282E] text-white rounded-2xl p-4 border border-[#1A3E46] shadow-md flex flex-col justify-between backface-hidden rotate-y-180 text-xs">
                        <div>
                          <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                            <span className="text-[10px] uppercase font-bold text-[#D4AF37]">Profile</span>
                            <RotateCw className="w-3 h-3 text-zinc-400" />
                          </div>
                          <h5 className="font-serif font-bold text-sm text-white mb-0.5">{doc.name}</h5>
                          <p className="text-[11px] text-[#EAD8B7] mb-2">{doc.education}</p>
                          <p className="text-[11px] text-zinc-300 line-clamp-4 italic mb-2">
                            &ldquo;{doc.philosophy}&rdquo;
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onBookWithDoctor(doc.id);
                          }}
                          className="w-full py-2 bg-white text-[#0E282E] font-bold text-[11px] rounded-lg hover:bg-[#EAD8B7] transition-colors"
                        >
                          Book with {doc.name.split(' ')[1]}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Accreditations Banner */}
            <div className="p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4">
                Accreditations & Professional Standards
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {accreditations.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#FAF9F6] border border-zinc-200 flex items-center justify-center flex-shrink-0 text-[#0E282E]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-900">{item.title}</p>
                      <p className="text-[11px] text-zinc-500 leading-tight">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
