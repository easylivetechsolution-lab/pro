import React, { useState } from 'react';
import { ArrowRight, Calendar, UserCheck, FileText, CheckCircle2 } from 'lucide-react';

interface JourneySectionProps {
  onOpenBooking: () => void;
}

export const JourneySection: React.FC<JourneySectionProps> = ({ onOpenBooking }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '1',
      title: 'Book',
      desc: 'Choose a time that works for you online or by phone.',
      detail: 'Instant digital confirmation, paperless medical history from your phone, and complimentary downtown parking reservation.',
      icon: Calendar,
    },
    {
      num: '2',
      title: 'Meet Your Dentist',
      desc: "We'll discuss your goals, examine your teeth and create a plan.",
      detail: 'Enjoy our sensory suite with a warm beverage, receive a 3D intraoral scan, and review photorealistic smile projections together.',
      icon: UserCheck,
    },
    {
      num: '3',
      title: 'Leave With a Clear Plan',
      desc: 'Know your options, exact transparent costs and next steps.',
      detail: 'Receive a personalized digital treatment booklet with zero hidden fees and direct insurance coordination.',
      icon: FileText,
    }
  ];

  return (
    <section id="journey" className="py-20 lg:py-28 bg-[#FAF9F6] border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5B7980] mb-2">
            <span>Your First Visit</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#0E282E] tracking-tight">
            A Simple 3-Step Journey
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600">
            Get the elevated dental care you deserve, without an ounce of stress or uncertainty.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;

            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-6 sm:p-8 rounded-3xl transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-2 border-[#0E282E] shadow-lg translate-y-[-4px]'
                    : 'bg-white/80 border border-zinc-200/80 hover:bg-white hover:border-zinc-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-4xl font-bold text-[#0E282E]/30">
                      0{step.num}
                    </span>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-[#0E282E] text-[#EAD8B7]' : 'bg-[#FAF9F6] text-[#0E282E]'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-serif font-semibold text-[#0E282E] mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-100">
                  <div className="flex items-start gap-2 text-xs text-zinc-500">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{step.detail}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Step Callout CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-[#0E282E]">Ready to experience PearlView Dental Studio?</h4>
            <p className="text-xs text-zinc-500">New patient comprehensive appointments available this week.</p>
          </div>

          <button
            onClick={onOpenBooking}
            className="group inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-wider uppercase text-white bg-[#0E282E] hover:bg-[#153B44] rounded-full shadow-md transition-all cursor-pointer"
          >
            <span>Book an appointment</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
