import React, { useState } from 'react';
import { X, Smile, Check, ArrowRight, RotateCcw } from 'lucide-react';

interface SmileQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookRecommended: (serviceId: string) => void;
}

export const SmileQuizModal: React.FC<SmileQuizModalProps> = ({
  isOpen,
  onClose,
  onBookRecommended,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [goal, setGoal] = useState<string>('');
  const [comfort, setComfort] = useState<string>('');
  const [timeline, setTimeline] = useState<string>('');

  if (!isOpen) return null;

  const resetQuiz = () => {
    setCurrentStep(0);
    setGoal('');
    setComfort('');
    setTimeline('');
  };

  const getRecommendation = () => {
    if (goal === 'whitening') {
      return {
        serviceId: 'cosmetic',
        title: 'In-Office Zoom! Laser Whitening + Enamel Polish',
        desc: 'Up to 8 shades whiter in a single 60-minute session with zero tooth sensitivity formula.',
        duration: '1 visit (60 min)',
        savings: 'Includes take-home touch-up syringe',
      };
    }
    if (goal === 'align') {
      return {
        serviceId: 'invisalign',
        title: 'Invisalign® SmartTrack Digital Clear Aligners',
        desc: 'Virtually invisible orthodontic alignment with 3D ClinCheck computer preview before you begin.',
        duration: '6 - 12 months average',
        savings: '0% APR monthly financing from $129/mo',
      };
    }
    if (goal === 'missing') {
      return {
        serviceId: 'implants',
        title: 'Computer-Guided Titanium & Zirconia Dental Implants',
        desc: 'Permanent lifetime restoration of missing teeth with bio-compatible ceramic aesthetics.',
        duration: 'Single-tooth or full arch',
        savings: '98.7% success rate with warranty',
      };
    }
    return {
      serviceId: 'cosmetic',
      title: 'Bespoke Digital Smile Makeover (Veneers & Aesthetics)',
      desc: 'Custom hand-layered feldspathic porcelain veneers designed in harmony with your facial symmetry.',
      duration: '2 appointments over 3 weeks',
      savings: 'Complimentary 3D digital preview included',
    };
  };

  const rec = getRecommendation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 bg-[#0E282E] text-white flex items-center justify-between border-b border-[#1A3E46]">
          <div className="flex items-center gap-2.5">
            <Smile className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-serif text-lg font-semibold text-white">
              Virtual Smile Assessment
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {currentStep === 0 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Step 1 of 3</span>
              <h4 className="text-xl font-serif font-bold text-[#0E282E]">
                What is your primary smile goal?
              </h4>

              <div className="space-y-2.5 pt-2">
                {[
                  { id: 'whitening', label: 'Brighter, whiter teeth without sensitivity' },
                  { id: 'align', label: 'Discreet straightening without metal braces (Invisalign)' },
                  { id: 'makeover', label: 'Complete aesthetic makeover (chips, gaps, shape)' },
                  { id: 'missing', label: 'Permanent replacement for missing or broken teeth' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setGoal(opt.id);
                      setCurrentStep(1);
                    }}
                    className="w-full text-left p-3.5 rounded-xl border border-zinc-200 hover:border-[#0E282E] hover:bg-[#FAF9F6] text-xs font-semibold text-zinc-800 transition-all flex items-center justify-between cursor-pointer"
                  >
                    <span>{opt.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Step 2 of 3</span>
              <h4 className="text-xl font-serif font-bold text-[#0E282E]">
                What is most important for your comfort?
              </h4>

              <div className="space-y-2.5 pt-2">
                {[
                  { id: 'anxiety', label: 'Gentle, zero-anxiety care & sedation options' },
                  { id: 'speed', label: 'Fastest possible same-day digital precision' },
                  { id: 'budget', label: 'Transparent 0% APR financing & insurance filing' },
                  { id: 'luxury', label: 'Private concierge suite & bespoke aesthetics' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setComfort(opt.id);
                      setCurrentStep(2);
                    }}
                    className="w-full text-left p-3.5 rounded-xl border border-zinc-200 hover:border-[#0E282E] hover:bg-[#FAF9F6] text-xs font-semibold text-zinc-800 transition-all flex items-center justify-between cursor-pointer"
                  >
                    <span>{opt.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Step 3 of 3</span>
              <h4 className="text-xl font-serif font-bold text-[#0E282E]">
                What is your desired timeframe?
              </h4>

              <div className="space-y-2.5 pt-2">
                {[
                  { id: 'asap', label: 'Immediately / within the next 2 weeks' },
                  { id: 'month', label: 'Within the next 1 to 3 months' },
                  { id: 'exploring', label: 'Exploring options for an upcoming wedding or event' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setTimeline(opt.id);
                      setCurrentStep(3);
                    }}
                    className="w-full text-left p-3.5 rounded-xl border border-zinc-200 hover:border-[#0E282E] hover:bg-[#FAF9F6] text-xs font-semibold text-zinc-800 transition-all flex items-center justify-between cursor-pointer"
                  >
                    <span>{opt.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="animate-in zoom-in-95 duration-200 text-center">
              <div className="w-12 h-12 rounded-full bg-[#FAF9F6] border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center mx-auto mb-3">
                <Smile className="w-6 h-6" />
              </div>

              <span className="text-[10px] uppercase font-bold tracking-widest text-[#5B7980]">
                Your Personalized Recommendation
              </span>

              <h4 className="text-xl font-serif font-bold text-[#0E282E] mt-1 mb-3">
                {rec.title}
              </h4>

              <p className="text-xs text-zinc-600 leading-relaxed max-w-sm mx-auto mb-5">
                {rec.desc}
              </p>

              <div className="bg-[#FAF9F6] p-3.5 rounded-xl border border-zinc-200 text-left text-xs space-y-1.5 mb-6">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Estimated Duration:</span>
                  <span className="font-semibold text-zinc-800">{rec.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Value Highlight:</span>
                  <span className="font-semibold text-emerald-700">{rec.savings}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={resetQuiz}
                  className="px-4 py-2.5 text-xs text-zinc-600 hover:text-zinc-900 border border-zinc-200 rounded-xl flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onBookRecommended(rec.serviceId);
                  }}
                  className="flex-1 py-3 px-5 text-xs font-semibold uppercase tracking-wider text-white bg-[#0E282E] hover:bg-[#153B44] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book Recommended Treatment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
