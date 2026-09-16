import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Award, 
  ShieldCheck, 
  TreePine, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Building2, 
  Compass,
  Cpu,
  Layers,
  HeartHandshake
} from 'lucide-react';
import craftsmanWoodworkerImg from '../assets/images/craftsman_woodworker_1789334457347.jpg';
import inspectJoineryTeamImg from '../assets/images/inspect_joinery_team_1789439943216.jpg';
import jamesCarterAvatar from '../assets/images/james_carter_avatar_1789339402551.jpg';

interface AboutPageProps {
  onOpenStory: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenStory }) => {
  const navigate = useNavigate();

  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#0e1014] text-[#e8eaed] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-zinc-400 mb-6 font-medium">
          <Link to="/" className="hover:text-[#f3ba77] transition-colors">Home</Link>
          <span className="text-zinc-600">/</span>
          <span className="text-white">About Us</span>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-[#e2b47f] mb-4">
            <Award className="w-3.5 h-3.5" />
            Our Heritage & Philosophy
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Where Master Woodworking Meets Spinal Ergonomics
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
            MarkWell was born from a fundamental refusal: to accept that high-performance ergonomic office chairs 
            must look like plastic gadgets, or that beautiful hardwood furniture must be rigid and posture-punishing.
          </p>
        </div>

        {/* Key Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-20">
          <div className="bg-[#141820] border border-white/10 p-6 rounded-2xl">
            <span className="block font-mono text-3xl sm:text-4xl font-extrabold text-[#e2a466] mb-1">14+</span>
            <span className="text-xs sm:text-sm font-semibold text-white block">Years of Artisan Heritage</span>
            <span className="text-[11px] text-zinc-400 mt-1 block">Founded in 2012 by master woodwrights and orthopedic engineers</span>
          </div>
          <div className="bg-[#141820] border border-white/10 p-6 rounded-2xl">
            <span className="block font-mono text-3xl sm:text-4xl font-extrabold text-[#e2a466] mb-1">100%</span>
            <span className="text-xs sm:text-sm font-semibold text-white block">FSC-Certified Timber</span>
            <span className="text-[11px] text-zinc-400 mt-1 block">Zero old-growth clearing. Responsibly harvested European & American woods</span>
          </div>
          <div className="bg-[#141820] border border-white/10 p-6 rounded-2xl">
            <span className="block font-mono text-3xl sm:text-4xl font-extrabold text-[#e2a466] mb-1">10-Yr</span>
            <span className="text-xs sm:text-sm font-semibold text-white block">Commercial Guarantee</span>
            <span className="text-[11px] text-zinc-400 mt-1 block">Full coverage on all solid timber frames, motors, and hydraulic cylinders</span>
          </div>
          <div className="bg-[#141820] border border-white/10 p-6 rounded-2xl">
            <span className="block font-mono text-3xl sm:text-4xl font-extrabold text-[#e2a466] mb-1">12,000+</span>
            <span className="text-xs sm:text-sm font-semibold text-white block">Spaces Furnished</span>
            <span className="text-[11px] text-zinc-400 mt-1 block">Trusted by creative directors, corporate executives, and law firms</span>
          </div>
        </div>

        {/* The Origin Story - Split Visual Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 relative">
            <div className="aspect-4/3 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
              <img
                src={craftsmanWoodworkerImg}
                alt="MarkWell master craftsman hand-shaping American Black Walnut in atelier"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#e2a466] block mb-1">
                  The Portland Atelier
                </span>
                <p className="text-sm text-white font-medium">
                  Every live-edge slab is individually inspected, air-cured for 90 days, and kiln-dried to exactly 7.5% moisture equilibrium.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#e2a466] mb-3">
              Craftsmanship Legacy
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-6 tracking-tight">
              Furniture built to outlive its makers, not end up in a landfill.
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
              <p>
                In an era dominated by throwaway particleboard and mass-molded plastics, MarkWell operates on 
                the ancient principle of stewardship. We believe a work desk is not merely a utility surface; it is 
                an intellectual sanctuary where breakthrough ideas are born.
              </p>
              <p>
                Each desk, credenza, and lounge piece is crafted using generational joinery techniques—including 
                blind dovetails, wedged through-tenons, and butterfly spline reinforcements that allow solid wood to breathe 
                with seasonal humidity shifts without ever warping or splitting.
              </p>
              <p>
                We finish all wood surfaces exclusively with hand-rubbed botanical oils and organic beeswax. 
                Zero polyurethane film, zero synthetic fumes, and a velvety tactile warmth that only improves with age.
              </p>
            </div>
            
            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={onOpenStory}
                className="bg-[#e2a466] hover:bg-[#efb57b] text-black text-xs sm:text-sm font-semibold px-6 py-3 rounded-full transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>Watch Workshop Documentary</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/handcrafted"
                className="text-xs sm:text-sm text-zinc-300 hover:text-white underline underline-offset-4 transition-colors"
              >
                Explore Handcrafted Pieces
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars of MarkWell */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#e2a466] block mb-2">
              Our Non-Negotiable Standards
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              The Four Pillars of MarkWell Design
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-[#141820] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e2a466] mb-5">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Biomechanical Engineering</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Developed in consultation with orthopedic specialists to eliminate pressure points, encourage micro-movements, and support lumbar curvature.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/5 text-[11px] text-zinc-500 font-mono">
                BIFMA / EN 1335 Compliant
              </div>
            </div>

            <div className="bg-[#141820] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e2a466] mb-5">
                  <TreePine className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Ecological Forestry</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  100% of our timber is chain-of-custody certified from selectively harvested American Black Walnut and European White Oak forests.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/5 text-[11px] text-zinc-500 font-mono">
                FSC License #C149821
              </div>
            </div>

            <div className="bg-[#141820] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e2a466] mb-5">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Heirloom Joinery</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Mortise and tenon joinery, butterfly keys, and hand-stitched aniline Tuscan leather. No fast adhesives or cheap laminate edge-banding.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/5 text-[11px] text-zinc-500 font-mono">
                Hand-Numbered & Signed
              </div>
            </div>

            <div className="bg-[#141820] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e2a466] mb-5">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Lifetime Relationship</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Complimentary leather conditioner refills, hardware tune-ups, and white-glove relocations for the lifetime of your workspace.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/5 text-[11px] text-zinc-500 font-mono">
                10-Year Guarantee
              </div>
            </div>

          </div>
        </div>

        {/* The 10-Point Inspection Team Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#141820] border border-white/10 rounded-3xl p-8 sm:p-12 mb-24">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#e2a466] mb-2 block">
              Rigorous Quality Assurance
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
              The 10-Point Inspection Standard
            </h2>
            <p className="text-sm text-zinc-300 font-normal leading-relaxed mb-6">
              Before any desk, chair, or conference table leaves our atelier, it passes through 10 distinct checkpoints 
              overseen by senior quality inspectors. From laser flatbed tolerance scans (&lt;0.5mm variance across an 8-foot span) 
              to 350-pound pneumatic tilt cycling, we ensure flawless performance.
            </p>

            <ul className="space-y-2.5 text-xs text-zinc-300 mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#e2a466] shrink-0" />
                <span>Moisture Equilibrium & Grain Alignment verification</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#e2a466] shrink-0" />
                <span>Synchronized pneumatic tilt & gas cylinder load testing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#e2a466] shrink-0" />
                <span>Dovetail joint load deflection and tensile stress testing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#e2a466] shrink-0" />
                <span>Full-grain leather stitch tension & tear resistance inspection</span>
              </li>
            </ul>

            <button
              onClick={() => navigate('/shop')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs font-semibold px-5 py-2.5 rounded-full transition-colors cursor-pointer"
            >
              Browse Certified Furniture
            </button>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="rounded-2xl overflow-hidden border border-white/10 aspect-16/10">
              <img
                src={inspectJoineryTeamImg}
                alt="MarkWell inspection team checking joinery tolerances"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Global Showrooms & Ateliers */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#e2a466] block mb-2">
              Visit Our Spaces
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Flagship Studios & Design Ateliers
            </h2>
            <p className="text-sm text-zinc-400 mt-2 font-normal">
              Experience the timber grains in person and test ergonomic seating configurations with our specialists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#141820] border border-white/10 p-6 rounded-2xl">
              <div className="text-xs font-bold text-[#e2a466] uppercase tracking-wider mb-2">Flagship Showroom</div>
              <h3 className="text-xl font-bold text-white mb-2">San Francisco Atelier</h3>
              <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                1450 Utah Street, Suite 400<br />
                San Francisco, CA 94110<br />
                Phone: (415) 890-3490
              </p>
              <div className="text-[11px] text-zinc-500 font-mono">
                Open Mon–Sat: 9:00 AM – 6:00 PM PST
              </div>
            </div>

            <div className="bg-[#141820] border border-white/10 p-6 rounded-2xl">
              <div className="text-xs font-bold text-[#e2a466] uppercase tracking-wider mb-2">Design Studio</div>
              <h3 className="text-xl font-bold text-white mb-2">New York SoHo Atelier</h3>
              <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                482 Broome Street, 3rd Floor<br />
                New York, NY 10013<br />
                Phone: (212) 670-8820
              </p>
              <div className="text-[11px] text-zinc-500 font-mono">
                Open Mon–Sat: 10:00 AM – 7:00 PM EST
              </div>
            </div>

            <div className="bg-[#141820] border border-white/10 p-6 rounded-2xl">
              <div className="text-xs font-bold text-[#e2a466] uppercase tracking-wider mb-2">European Atelier</div>
              <h3 className="text-xl font-bold text-white mb-2">London Mayfair Gallery</h3>
              <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                18 Berkeley Square<br />
                London, W1J 6BQ, UK<br />
                Phone: +44 20 7946 0912
              </p>
              <div className="text-[11px] text-zinc-500 font-mono">
                Open Mon–Fri: 10:00 AM – 6:30 PM GMT
              </div>
            </div>

          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-b from-[#141820] to-[#0a0c10] border border-white/10 rounded-3xl p-10 sm:p-16">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            Ready to Transform Your Working Experience?
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mb-8 font-normal">
            Whether for your home office sanctum or an entire corporate headquarters, our team is ready to assist.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('/shop')}
              className="bg-[#e2a466] hover:bg-[#efb57b] text-black font-semibold text-xs sm:text-sm px-7 py-3 rounded-full transition-colors cursor-pointer"
            >
              Explore Furniture Catalog
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs sm:text-sm px-7 py-3 rounded-full transition-colors cursor-pointer"
            >
              Contact Our Consultants
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
