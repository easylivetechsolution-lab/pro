import React, { useState } from 'react';
import { 
  Star, Quote, CheckCircle2, Award, MoveHorizontal, 
  ArrowRight, Heart, Filter, MessageSquare, Play, Video
} from 'lucide-react';
import { TRANSFORMATIONS_DATA, TESTIMONIALS_DATA } from '../data/dentalData';

interface PatientStoriesPageProps {
  onOpenBooking: () => void;
  onNavigate: (page: string) => void;
}

export const PatientStoriesPage: React.FC<PatientStoriesPageProps> = ({ onOpenBooking, onNavigate }) => {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState<number>(0);
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [selectedReviewCategory, setSelectedReviewCategory] = useState<string>('all');

  const detailedCaseStudies = [
    {
      name: 'Elena Rostova',
      age: 34,
      occupation: 'Tech Product Director, Austin',
      procedure: '8 Custom Porcelain Veneers & Laser Gum Balancing',
      timeline: '2 visits over 14 days',
      doctor: 'Dr. Audrey Chen, DDS',
      quote: 'For over ten years, I instinctively covered my mouth when laughing in board meetings or social photos. Finding Dr. Audrey Chen changed everything. She designed a smile that looks completely, naturally mine—not fake or overly white. My friends simply tell me I look radiantly well-rested.',
      beforeImg: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=800&auto=format&fit=crop',
      afterImg: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop',
      doctorNotes: 'Elena presented with moderate enamel fluorosis, edge wear, and mild asymmetric gingival margins. Using WaterLase laser contouring and handcrafted ultrathin feldspathic veneers, we enhanced width-to-length tooth ratios while maintaining natural micro-texture and incisal translucency.'
    },
    {
      name: 'Marcus Vance',
      age: 46,
      occupation: 'Architect & Designer',
      procedure: 'Computer-Guided Ceramic Implant & Zirconia Crown',
      timeline: 'Completed in 1 surgical visit + final restoration',
      doctor: 'Dr. Audrey Chen & Surgical Team',
      quote: 'After a cycling injury caused a fractured front incisor, I was terrified of losing my tooth. PearlView’s 3D CBCT guided surgery placed the ceramic implant with absolute zero pain. The color match is so microscopic that even my wife cannot tell which tooth is the implant.',
      beforeImg: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop',
      afterImg: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=800&auto=format&fit=crop',
      doctorNotes: 'Traumatic coronal fracture of tooth #9. Using 3D cone-beam computed tomography and surgical guide fabrication, we placed an immediate zirconia implant fixture with custom emergent profile healing abutment, preserving natural interdental papillae perfectly.'
    },
    {
      name: 'Sophia Lindqvist',
      age: 29,
      occupation: 'Austin Musician & Songwriter',
      procedure: 'Invisalign® Platinum Clear Aligners + Zoom! Whitening',
      timeline: '6.5 months (14 dual-arch aligner trays)',
      doctor: 'Dr. Audrey Chen, DDS',
      quote: 'As a performing musician, I couldn’t wear traditional metal braces on stage. Invisalign trays were completely invisible—even when singing under harsh stage spotlights. My crowding and crossbite were fixed in less than 7 months.',
      beforeImg: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop',
      afterImg: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop',
      doctorNotes: 'Class I malocclusion with 4.5mm anterior mandibular crowding and lingual displacement. Corrected with weekly Invisalign tray progressions, finished with enamel micro-abrasion and in-office Zoom! 8-shade brightening.'
    },
    {
      name: 'David Kozlov',
      age: 58,
      occupation: 'Civil Engineer',
      procedure: 'Full Mouth Restorative Rehabilitation & Sedation Protocol',
      timeline: '3 phased visits with oral twilight sedation',
      doctor: 'Dr. Audrey Chen, DDS',
      quote: 'I had avoided the dentist for nearly fifteen years due to a horrific childhood trauma. The warmth, empathy, and twilight sedation at PearlView dissolved all my fears. I woke up with my bite completely restored, pain-free, and I can eat steak again with joy.',
      beforeImg: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop',
      afterImg: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
      doctorNotes: 'Severe nocturnal bruxism with 40% loss of vertical dimension of occlusion (VDO). Re-established proper TMJ centric relation using monolithic zirconia restorations across the posterior arches.'
    }
  ];

  const currentCase = detailedCaseStudies[selectedCaseIdx];

  const filteredTestimonials = TESTIMONIALS_DATA.filter((t) => {
    if (selectedReviewCategory === 'all') return true;
    if (selectedReviewCategory === 'cosmetic') return t.service.toLowerCase().includes('veneer') || t.service.toLowerCase().includes('whitening');
    if (selectedReviewCategory === 'restorative') return t.service.toLowerCase().includes('implant') || t.service.toLowerCase().includes('crown');
    if (selectedReviewCategory === 'ortho') return t.service.toLowerCase().includes('invisalign');
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-zinc-900 pt-6 pb-24">
      {/* Top Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
          <button 
            onClick={() => onNavigate('home')}
            className="hover:text-[#0E282E] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#0E282E] font-semibold">Patient Stories</span>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="rounded-3xl bg-[#0E282E] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-1/4 bottom-0 w-80 h-80 bg-[#16363D]/40 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#EAD8B7] text-xs font-semibold uppercase tracking-widest mb-6">
              <Award className="w-3.5 h-3.5" />
              <span>Real Transformations & Clinical Case Studies</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-white tracking-tight mb-6 leading-tight">
              Real Patients. Genuine Confidence. Lasting Artistry.
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-light mb-8">
              A smile transformation is deeply personal. Read unfiltered stories from fellow Austin patients who overcame dental anxiety, restored their dental wellness, and uncovered their radiant potential.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-8 py-4 bg-[#EAD8B7] hover:bg-white text-[#0E282E] font-semibold text-xs sm:text-sm tracking-wider uppercase rounded-full shadow-lg transition-all duration-200 cursor-pointer"
              >
                Begin Your Transformation
              </button>
              <a
                href="#case-studies"
                className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm rounded-full transition-colors border border-white/15"
              >
                Explore Clinical Cases &darr;
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Practice Statistics Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-zinc-200/90 text-center shadow-2xs">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-[#0E282E] block mb-1">5.0</span>
            <div className="flex justify-center text-[#D4AF37] gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-xs text-zinc-500 font-medium">Over 480+ Verified Reviews</span>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-zinc-200/90 text-center shadow-2xs">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-[#0E282E] block mb-1">4,800+</span>
            <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider block mb-1">Smiles Transformed</span>
            <span className="text-xs text-zinc-500">In Central Texas since 2014</span>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-zinc-200/90 text-center shadow-2xs">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-[#0E282E] block mb-1">99.4%</span>
            <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider block mb-1">Recommendation Rate</span>
            <span className="text-xs text-zinc-500">Internal patient surveys</span>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-zinc-200/90 text-center shadow-2xs">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-[#0E282E] block mb-1">100%</span>
            <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider block mb-1">Digital Protocol</span>
            <span className="text-xs text-zinc-500">Zero analog goop impressions</span>
          </div>
        </div>
      </div>

      {/* Featured Clinical Case Study Interactive Section */}
      <div id="case-studies" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-[#5B7980] block mb-2">
            In-Depth Case Studies
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#0E282E]">
            Transformations from Start to Finish
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-2">
            Inspect real patient photography, clinical objectives, and honest testimonials.
          </p>
        </div>

        {/* Case Selector Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-3 pb-4 mb-8">
          {detailedCaseStudies.map((c, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedCaseIdx(idx);
                setSliderPos(50);
              }}
              className={`px-5 py-3 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCaseIdx === idx
                  ? 'bg-[#0E282E] text-white shadow-md'
                  : 'bg-white border border-zinc-200 text-zinc-700 hover:border-zinc-300'
              }`}
            >
              <span>{c.name}</span>
              <span className="text-[10px] text-zinc-400 block font-normal">{c.procedure.split('&')[0]}</span>
            </button>
          ))}
        </div>

        {/* Main Case Card */}
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-md p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Interactive Before/After Visual (6 cols) */}
            <div className="lg:col-span-6">
              <div 
                className="relative rounded-2xl overflow-hidden aspect-4/3 sm:aspect-16/10 bg-zinc-100 select-none shadow-md border border-zinc-200 cursor-ew-resize"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                  setSliderPos((x / rect.width) * 100);
                }}
                onTouchMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const touch = e.touches[0];
                  const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
                  setSliderPos((x / rect.width) * 100);
                }}
              >
                {/* AFTER IMAGE (BACKGROUND) */}
                <img
                  src={currentCase.afterImg}
                  alt={`After: ${currentCase.name}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <span className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-[#0E282E]/80 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider">
                  After Treatment
                </span>

                {/* BEFORE IMAGE (CLIP PATH) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                  <img
                    src={currentCase.beforeImg}
                    alt={`Before: ${currentCase.name}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider">
                    Before Care
                  </span>
                </div>

                {/* SLIDER HANDLE */}
                <div
                  className="absolute top-0 bottom-0 z-20 pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="h-full w-0.5 bg-white relative shadow-lg">
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-[#0E282E] shadow-xl border border-zinc-300 flex items-center justify-center pointer-events-auto">
                      <MoveHorizontal className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium pointer-events-none">
                  Drag or scrub to compare
                </div>
              </div>
            </div>

            {/* Case Details (6 cols) */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <span className="text-[11px] uppercase font-bold tracking-widest text-[#D4AF37] block mb-1">
                  Verified Case #{selectedCaseIdx + 1}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#0E282E] font-bold">
                  {currentCase.name}
                </h3>
                <p className="text-xs text-zinc-500">{currentCase.occupation} &bull; Age {currentCase.age}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF9F6] border border-zinc-200">
                <Quote className="w-6 h-6 text-[#0E282E]/30 mb-2" />
                <p className="text-xs sm:text-sm text-zinc-700 italic leading-relaxed">
                  &ldquo;{currentCase.quote}&rdquo;
                </p>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-100">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">Procedure</span>
                  <span className="font-semibold text-zinc-900 mt-0.5 block">{currentCase.procedure}</span>
                </div>
                <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-100">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">Visits & Time</span>
                  <span className="font-semibold text-zinc-900 mt-0.5 block">{currentCase.timeline}</span>
                </div>
              </div>

              {/* Doctor's Clinical Note */}
              <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs">
                <span className="font-bold text-emerald-900 block mb-1">Doctor's Clinical Insight ({currentCase.doctor}):</span>
                <p className="text-zinc-600 text-[11px] leading-relaxed">{currentCase.doctorNotes}</p>
              </div>

              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-6 py-3 bg-[#0E282E] hover:bg-[#153B44] text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Consult on a Similar Transformation &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Reviews Wall */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#5B7980] block mb-2">
              Google Verified Reviews
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#0E282E]">
              Patient Testimonials
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Reviews' },
              { id: 'cosmetic', label: 'Veneers & Whitening' },
              { id: 'restorative', label: 'Implants & Crowns' },
              { id: 'ortho', label: 'Invisalign' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedReviewCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedReviewCategory === cat.id
                    ? 'bg-[#0E282E] text-white shadow-xs'
                    : 'bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((review, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-2xl border border-zinc-200/90 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-[#D4AF37] gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] text-zinc-400 font-medium">{review.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed mb-6">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-zinc-900">{review.name}</h4>
                  <span className="text-[10px] text-zinc-400">{review.service}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-medium">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
