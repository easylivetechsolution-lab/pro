import React, { useState } from 'react';
import { 
  ShieldCheck, Calculator, Check, ArrowRight, Info, HelpCircle, 
  CreditCard, DollarSign, Calendar, Percent, 
  FileText, Download, CheckCircle2, ChevronDown, ChevronUp 
} from 'lucide-react';
import { CLINIC_INFO } from '../data/dentalData';

interface FeesInsurancePageProps {
  onOpenBooking: (serviceId?: string) => void;
  onNavigate: (page: string) => void;
}

interface FeeItem {
  name: string;
  code: string;
  category: string;
  standardFee: number;
  insuranceCoverageTypical: string;
  insuranceCopayTypical: string;
  membershipPrice: number;
  monthlyFrom: number;
  notes: string;
  isPopular?: boolean;
}

const DENTAL_FEES_SCHEDULE: FeeItem[] = [
  // Preventive & Diagnostic
  {
    name: 'Comprehensive New Patient Exam & Digital Wellness Scan',
    code: 'D0150',
    category: 'Preventive',
    standardFee: 150,
    insuranceCoverageTypical: '100% covered',
    insuranceCopayTypical: '$0',
    membershipPrice: 0,
    monthlyFrom: 0,
    notes: 'Includes complete iTero 5D 3D scan, cancer screening, and digital gum charting.',
    isPopular: true
  },
  {
    name: 'Adult Routine Prophylaxis (Cleaning)',
    code: 'D1110',
    category: 'Preventive',
    standardFee: 140,
    insuranceCoverageTypical: '100% covered (2x/year)',
    insuranceCopayTypical: '$0',
    membershipPrice: 0,
    monthlyFrom: 0,
    notes: 'Gentle ultrasonic polish with organic remineralizing pastes.'
  },
  {
    name: 'Complete Low-Dose Digital Bitewing X-Rays (4 films)',
    code: 'D0274',
    category: 'Preventive',
    standardFee: 85,
    insuranceCoverageTypical: '100% covered',
    insuranceCopayTypical: '$0',
    membershipPrice: 0,
    monthlyFrom: 0,
    notes: 'Ultra-low radiation green sensors with instant AI micro-cavity detection.'
  },
  {
    name: '3D Panoramic Diagnostic Volumetric Imaging',
    code: 'D0367',
    category: 'Preventive',
    standardFee: 210,
    insuranceCoverageTypical: '80% - 100% covered',
    insuranceCopayTypical: '$0 - $42',
    membershipPrice: 0,
    monthlyFrom: 0,
    notes: 'Comprehensive jaw, airway, and nerve path full arch analysis.'
  },

  // Cosmetic Smile Design
  {
    name: 'Custom Handcrafted Porcelain Veneer (per tooth)',
    code: 'D2962',
    category: 'Cosmetic',
    standardFee: 1650,
    insuranceCoverageTypical: 'Elective cosmetic (0%)',
    insuranceCopayTypical: '$1,650 (Standard)',
    membershipPrice: 1320,
    monthlyFrom: 69,
    notes: 'Master ceramist layered feldspathic or e.max porcelain with life-like translucency.',
    isPopular: true
  },
  {
    name: 'Zoom! In-Office Laser Teeth Whitening + Custom Take-Home Trays',
    code: 'D9972',
    category: 'Cosmetic',
    standardFee: 495,
    insuranceCoverageTypical: 'Elective cosmetic (0%)',
    insuranceCopayTypical: '$495 flat package',
    membershipPrice: 395,
    monthlyFrom: 42,
    notes: 'Up to 8 shades whiter in 60 minutes with zero sensitivity post-treatment mineral seal.',
    isPopular: true
  },
  {
    name: 'Cosmetic Micro-Composite Resin Bonding (per tooth)',
    code: 'D2391',
    category: 'Cosmetic',
    standardFee: 420,
    insuranceCoverageTypical: '0% - 50% depending on plan',
    insuranceCopayTypical: '$210 - $420',
    membershipPrice: 336,
    monthlyFrom: 35,
    notes: 'Seamless artistic closure of gaps, chips, and irregular tooth edges in one visit.'
  },
  {
    name: 'Laser Gum Contouring & Architecture (per arch)',
    code: 'D4212',
    category: 'Cosmetic',
    standardFee: 750,
    insuranceCoverageTypical: '0% - 50% (plan specific)',
    insuranceCopayTypical: '$375 - $750',
    membershipPrice: 600,
    monthlyFrom: 55,
    notes: 'Gentle Biolase WaterLase reshaping of gummy smiles with rapid 24-hr recovery.'
  },

  // Restorative Care
  {
    name: 'All-Ceramic Bio-Compatible Zirconia / E.max Crown',
    code: 'D2740',
    category: 'Restorative',
    standardFee: 1450,
    insuranceCoverageTypical: '50% covered',
    insuranceCopayTypical: '$725',
    membershipPrice: 1160,
    monthlyFrom: 60,
    notes: 'Metal-free, ultra-durable monolithic zirconia fabricated to match natural teeth.',
    isPopular: true
  },
  {
    name: 'Tooth-Colored Seamless Composite Filling (Single Surface)',
    code: 'D2391',
    category: 'Restorative',
    standardFee: 240,
    insuranceCoverageTypical: '80% covered',
    insuranceCopayTypical: '$48',
    membershipPrice: 192,
    monthlyFrom: 20,
    notes: 'BPA-free composite bonded directly to preserve natural tooth structure.'
  },
  {
    name: 'Tooth-Colored Composite Filling (Two Surfaces)',
    code: 'D2392',
    category: 'Restorative',
    standardFee: 310,
    insuranceCoverageTypical: '80% covered',
    insuranceCopayTypical: '$62',
    membershipPrice: 248,
    monthlyFrom: 26,
    notes: 'Multi-layer aesthetic shading with invisible margin blending.'
  },
  {
    name: 'Ceramic Conservative Inlay / Onlay',
    code: 'D2610',
    category: 'Restorative',
    standardFee: 1050,
    insuranceCoverageTypical: '50% covered',
    insuranceCopayTypical: '$525',
    membershipPrice: 840,
    monthlyFrom: 48,
    notes: 'Conservative alternative to full crowns preserving up to 70% more natural enamel.'
  },

  // Implants
  {
    name: 'Single Dental Implant Fixture (Titanium / Ceramic)',
    code: 'D6010',
    category: 'Implants',
    standardFee: 2100,
    insuranceCoverageTypical: '0% - 50% covered',
    insuranceCopayTypical: '$1,050 - $2,100',
    membershipPrice: 1680,
    monthlyFrom: 89,
    notes: 'Computer-guided 3D robotic precision placement with lifetime integration warranty.',
    isPopular: true
  },
  {
    name: 'Custom Milled Precision Abutment & Screw',
    code: 'D6057',
    category: 'Implants',
    standardFee: 850,
    insuranceCoverageTypical: '50% covered',
    insuranceCopayTypical: '$425',
    membershipPrice: 680,
    monthlyFrom: 36,
    notes: 'Custom emergent profile tailored specifically to your natural gum architecture.'
  },
  {
    name: 'Implant-Supported All-Ceramic Crown',
    code: 'D6058',
    category: 'Implants',
    standardFee: 1550,
    insuranceCoverageTypical: '50% covered',
    insuranceCopayTypical: '$775',
    membershipPrice: 1240,
    monthlyFrom: 65,
    notes: 'Final crown screwed securely in place with perfect bite calibration.'
  },
  {
    name: 'All-on-4 / All-on-X Full Arch Immediate Restoration (per arch)',
    code: 'D6075',
    category: 'Implants',
    standardFee: 21500,
    insuranceCoverageTypical: 'Partial major restorative allowance',
    insuranceCopayTypical: 'Varies ($16k - $21k)',
    membershipPrice: 18500,
    monthlyFrom: 395,
    notes: 'Complete set of permanent teeth secured onto 4-6 implants in a single day.',
    isPopular: true
  },

  // Orthodontics
  {
    name: 'Invisalign® Express Clear Aligners (Up to 7 stages)',
    code: 'D8090',
    category: 'Orthodontics',
    standardFee: 2900,
    insuranceCoverageTypical: '$1,000 - $1,500 lifetime ortho allowance',
    insuranceCopayTypical: '$1,400 - $1,900',
    membershipPrice: 2450,
    monthlyFrom: 99,
    notes: 'Targeted correction for minor crowding, spacing, or relapse from past braces.'
  },
  {
    name: 'Invisalign® Comprehensive Full Dual-Arch Transformation',
    code: 'D8080',
    category: 'Orthodontics',
    standardFee: 5400,
    insuranceCoverageTypical: '$1,500 - $2,500 lifetime ortho benefit',
    insuranceCopayTypical: '$2,900 - $3,900',
    membershipPrice: 4600,
    monthlyFrom: 149,
    notes: 'Unlimited aligners, all refinements, iTero 5D progress tracking, plus 3 sets of Vivera® retainers.',
    isPopular: true
  }
];

export const FeesInsurancePage: React.FC<FeesInsurancePageProps> = ({ onOpenBooking, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [calculatorProcedure, setCalculatorProcedure] = useState<string>('Custom Handcrafted Porcelain Veneer (per tooth)');
  const [calculatorInsurance, setCalculatorInsurance] = useState<'tier1' | 'tier2' | 'membership' | 'none'>('tier1');
  const [calculatorMonths, setCalculatorMonths] = useState<number>(24);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const categories = ['All', 'Preventive', 'Cosmetic', 'Restorative', 'Implants', 'Orthodontics'];

  const filteredFees = DENTAL_FEES_SCHEDULE.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate dynamic quote in calculator
  const selectedItem = DENTAL_FEES_SCHEDULE.find(i => i.name === calculatorProcedure) || DENTAL_FEES_SCHEDULE[4];
  let calculatedPatientShare = selectedItem.standardFee;
  if (calculatorInsurance === 'tier1') {
    if (selectedItem.category === 'Preventive') calculatedPatientShare = 0;
    else if (selectedItem.category === 'Restorative') calculatedPatientShare = Math.round(selectedItem.standardFee * 0.2);
    else if (selectedItem.category === 'Cosmetic') calculatedPatientShare = selectedItem.standardFee;
    else calculatedPatientShare = Math.round(selectedItem.standardFee * 0.5);
  } else if (calculatorInsurance === 'tier2') {
    if (selectedItem.category === 'Preventive') calculatedPatientShare = Math.round(selectedItem.standardFee * 0.1);
    else if (selectedItem.category === 'Restorative') calculatedPatientShare = Math.round(selectedItem.standardFee * 0.5);
    else calculatedPatientShare = Math.round(selectedItem.standardFee * 0.7);
  } else if (calculatorInsurance === 'membership') {
    calculatedPatientShare = selectedItem.membershipPrice;
  }
  const estimatedMonthly = Math.round(calculatedPatientShare / calculatorMonths);

  const faqs = [
    {
      q: 'Do you file insurance claims directly on our behalf?',
      a: 'Yes, absolutely. Our concierge billing team verifies your exact real-time coverage prior to your arrival and electronically files all primary and secondary claims directly with your insurer. We track payments so you only pay your estimated copay at the time of service.'
    },
    {
      q: 'What if I do not have dental insurance?',
      a: 'Nearly 40% of our patients do not use traditional dental insurance. That is why we created the PearlView Wellness Membership Club, which covers all your routine exams, cleanings, and digital x-rays for an affordable monthly fee, while providing an automatic 20% discount on all cosmetic and restorative procedures.'
    },
    {
      q: 'Can I use Health Savings Accounts (HSA) or Flexible Spending Accounts (FSA)?',
      a: 'Yes! Dental crowns, fillings, cleanings, x-rays, implants, nightguards, and Invisalign clear aligners are fully qualified medical expenses under IRS tax regulations for HSA and FSA cards.'
    },
    {
      q: 'How does 0% APR dental financing work?',
      a: 'We partner with CareCredit, Sunbit, and Cherry to offer 6, 12, 18, and 24-month interest-free payment options. Approval takes less than 60 seconds with a soft credit check that will not affect your credit score.'
    },
    {
      q: 'Are there ever unexpected hidden fees?',
      a: 'Never. Before beginning any procedure, you will receive a transparent, itemized written treatment plan displaying the full breakdown of doctor fees, lab materials, and insurance estimates. You retain 100% control.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-zinc-900 pt-6 pb-24">
      {/* Top Breadcrumb & Return */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
          <button 
            onClick={() => onNavigate('home')}
            className="hover:text-[#0E282E] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#0E282E] font-semibold">Fees & Insurance</span>
        </div>
      </div>

      {/* Main Page Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="rounded-3xl bg-[#0E282E] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-1/3 bottom-0 w-80 h-80 bg-[#16363D]/40 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#EAD8B7] text-xs font-semibold uppercase tracking-widest mb-6">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Transparent Healthcare Charter</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-white tracking-tight mb-6 leading-tight">
              Clear, Honest Dental Fees & Insurance Coverage
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-light mb-8">
              We believe luxury healthcare requires radical financial transparency. No surprises, no hidden line items, and no high-pressure sales. Explore our complete fee schedule below.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenBooking()}
                className="px-8 py-4 bg-[#EAD8B7] hover:bg-white text-[#0E282E] font-semibold text-xs sm:text-sm tracking-wider uppercase rounded-full shadow-lg transition-all duration-200 cursor-pointer"
              >
                Book Consultation & Benefit Check
              </button>
              <a
                href="#fee-table"
                className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm rounded-full transition-colors border border-white/15"
              >
                Browse Fee Schedule &darr;
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars of Financial Ease */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-zinc-200/80 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-zinc-200 text-[#0E282E] flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5 text-[#0E282E]" />
            </div>
            <h3 className="text-base font-serif font-semibold text-[#0E282E] mb-1.5">PPO In-Network Care</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              We maximize benefits with Delta, MetLife, Cigna, Aetna, Guardian, and most major PPO networks.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-zinc-200/80 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-zinc-200 text-[#0E282E] flex items-center justify-center mb-4">
              <Percent className="w-5 h-5 text-[#0E282E]" />
            </div>
            <h3 className="text-base font-serif font-semibold text-[#0E282E] mb-1.5">0% APR Financing</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Flexible 6 to 24 month interest-free payments through CareCredit and Sunbit with instant pre-approvals.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-zinc-200/80 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-zinc-200 text-[#0E282E] flex items-center justify-center mb-4">
              <CreditCard className="w-5 h-5 text-[#0E282E]" />
            </div>
            <h3 className="text-base font-serif font-semibold text-[#0E282E] mb-1.5">HSA & FSA Eligible</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Utilize your pre-tax dollars for cleanings, crowns, dental implants, laser treatments, and Invisalign.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-zinc-200/80 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-zinc-200 text-[#0E282E] flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5 text-[#0E282E]" />
            </div>
            <h3 className="text-base font-serif font-semibold text-[#0E282E] mb-1.5">Written Price Lock</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Every fee quote is guaranteed in writing for 90 days with zero surprise billing adjustments.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Out-of-Pocket Payment Estimator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-sm p-6 sm:p-10 lg:p-12">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5B7980] mb-2">
              <Calculator className="w-4 h-4 text-[#D4AF37]" />
              <span>Interactive Estimator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#0E282E]">
              Calculate Your Estimated Out-of-Pocket Cost
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-2">
              Select a procedure and your current dental coverage status to estimate standard copays and affordable monthly installments.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Select Procedure */}
              <div>
                <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-2">
                  Select Treatment / Procedure
                </label>
                <select
                  value={calculatorProcedure}
                  onChange={(e) => setCalculatorProcedure(e.target.value)}
                  className="w-full p-3.5 bg-[#FAF9F6] border border-zinc-300 rounded-xl text-sm font-medium text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-[#0E282E]"
                >
                  {DENTAL_FEES_SCHEDULE.map((item, idx) => (
                    <option key={idx} value={item.name}>
                      {item.name} (${item.standardFee.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              {/* Coverage Tier */}
              <div>
                <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-2">
                  Coverage or Payment Method
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'tier1', label: 'PPO In-Network', desc: 'Standard Major Ins.' },
                    { id: 'tier2', label: 'PPO Out-of-Net', desc: 'Basic Coverage' },
                    { id: 'membership', label: 'PearlView Club', desc: '20% Member Rate' },
                    { id: 'none', label: 'No Insurance', desc: 'Standard Fee' },
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setCalculatorInsurance(tier.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        calculatorInsurance === tier.id
                          ? 'border-[#0E282E] bg-[#0E282E] text-white shadow-xs'
                          : 'border-zinc-200 bg-[#FAF9F6] text-zinc-800 hover:border-zinc-300'
                      }`}
                    >
                      <span className="block text-xs font-bold">{tier.label}</span>
                      <span className={`block text-[10px] mt-0.5 ${calculatorInsurance === tier.id ? 'text-[#EAD8B7]' : 'text-zinc-500'}`}>
                        {tier.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Financing Term Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-zinc-800 uppercase tracking-wider mb-2">
                  <span>Financing Duration (0% APR Available)</span>
                  <span className="text-[#0E282E] font-extrabold">{calculatorMonths} Months</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="36"
                  step="6"
                  value={calculatorMonths}
                  onChange={(e) => setCalculatorMonths(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-[#0E282E]"
                />
                <div className="flex justify-between text-[11px] text-zinc-400 mt-1">
                  <span>6 mos</span>
                  <span>12 mos</span>
                  <span>18 mos</span>
                  <span>24 mos</span>
                  <span>36 mos</span>
                </div>
              </div>
            </div>

            {/* Quote Card (5 cols) */}
            <div className="lg:col-span-5 bg-[#FAF9F6] rounded-2xl border border-zinc-200 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-zinc-200 pb-3 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Estimate Breakdown
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500 bg-white px-2 py-0.5 rounded-md border border-zinc-200">
                    Code: {selectedItem.code}
                  </span>
                </div>

                <div className="space-y-3 text-xs mb-6">
                  <div className="flex justify-between text-zinc-600">
                    <span>Full Standard Office Fee:</span>
                    <span className="font-semibold text-zinc-900">${selectedItem.standardFee.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Estimated Coverage / Savings:</span>
                    <span>-${(selectedItem.standardFee - calculatedPatientShare).toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-sm font-bold text-[#0E282E] pt-2 border-t border-zinc-200">
                    <span>Estimated Patient Out-of-Pocket:</span>
                    <span className="text-base">${calculatedPatientShare.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-zinc-200/80 mb-6 text-center">
                  <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-bold block">
                    Starting Monthly Payment
                  </span>
                  <span className="text-3xl font-serif font-bold text-[#0E282E] mt-1 block">
                    ${estimatedMonthly} <span className="text-xs font-sans font-normal text-zinc-500">/ mo</span>
                  </span>
                  <span className="text-[10px] text-zinc-400 block mt-1">
                    Based on {calculatorMonths}-month interest-free term
                  </span>
                </div>
              </div>

              <button
                onClick={() => onOpenBooking(selectedItem.category.toLowerCase())}
                className="w-full py-3 bg-[#0E282E] hover:bg-[#153B44] text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-colors cursor-pointer text-center"
              >
                Reserve This Treatment &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Fee Schedule Table */}
      <div id="fee-table" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5B7980] mb-2">
              <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Full Practice Price List</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#0E282E]">
              Itemized Procedure Schedule
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1">
              Every procedure broken down with standard ADA codes, insurance coverage benchmarks, and member discounts.
            </p>
          </div>

          {/* Search bar */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search procedure, ADA code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-zinc-300 rounded-xl text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-[#0E282E]"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0E282E] text-white shadow-xs'
                  : 'bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Fee Table Container */}
        <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF9F6] border-b border-zinc-200 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  <th className="py-4 px-6">Procedure & Details</th>
                  <th className="py-4 px-4">ADA Code</th>
                  <th className="py-4 px-4">Standard Fee</th>
                  <th className="py-4 px-4">Typical PPO Coverage</th>
                  <th className="py-4 px-4">Est. Copay</th>
                  <th className="py-4 px-4">Member Club Rate</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-xs text-zinc-700">
                {filteredFees.map((fee, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50/70 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-zinc-900">{fee.name}</span>
                        {fee.isPopular && (
                          <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide bg-[#EAD8B7] text-[#0E282E] rounded-md">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-500 mt-1 max-w-md">{fee.notes}</p>
                    </td>
                    <td className="py-4 px-4 font-mono text-[11px] text-zinc-500 font-semibold">
                      {fee.code}
                    </td>
                    <td className="py-4 px-4 font-semibold text-zinc-900">
                      ${fee.standardFee.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-emerald-700 font-medium">
                      {fee.insuranceCoverageTypical}
                    </td>
                    <td className="py-4 px-4 font-bold text-[#0E282E]">
                      {fee.insuranceCopayTypical}
                    </td>
                    <td className="py-4 px-4 font-semibold text-[#0E282E]">
                      {fee.membershipPrice === 0 ? (
                        <span className="text-emerald-600 font-bold">100% Free Included</span>
                      ) : (
                        `$${fee.membershipPrice.toLocaleString()}`
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => onOpenBooking()}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0E282E] hover:text-[#184650] hover:underline cursor-pointer"
                      >
                        Book &rarr;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PearlView Membership Club Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-[#0E282E] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="max-w-3xl mb-10">
            <span className="text-xs uppercase font-bold tracking-widest text-[#EAD8B7] block mb-2">
              No Insurance? No Problem.
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white mb-3">
              The PearlView Dental Wellness Membership
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Designed specifically for Austin professionals, creatives, and families without employer dental insurance. Enjoy proactive care with no deductibles, no maximums, and zero waiting periods.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Plan 1 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-zinc-300 font-semibold block">Adult Preventive</span>
                <div className="mt-3 mb-4">
                  <span className="text-4xl font-serif font-bold text-white">$39</span>
                  <span className="text-xs text-zinc-300"> / month</span>
                  <span className="block text-[11px] text-[#EAD8B7] mt-1">or $420 billed annually</span>
                </div>
                <ul className="space-y-2 text-xs text-zinc-200 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#EAD8B7] flex-shrink-0" />
                    <span>2 Comprehensive Exams & Cleanings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#EAD8B7] flex-shrink-0" />
                    <span>All Routine 3D Digital X-Rays</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#EAD8B7] flex-shrink-0" />
                    <span>1 Emergency Diagnostic Exam / year</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#EAD8B7] flex-shrink-0" />
                    <span>20% off all Restorative & Cosmetic care</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onOpenBooking()}
                className="w-full py-3 bg-white text-[#0E282E] font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-[#EAD8B7] transition-colors cursor-pointer"
              >
                Join Adult Plan
              </button>
            </div>

            {/* Plan 2: VIP */}
            <div className="bg-linear-to-b from-[#184650] to-[#0E282E] rounded-2xl p-6 border-2 border-[#D4AF37] flex flex-col justify-between shadow-xl relative">
              <span className="absolute -top-3 right-6 bg-[#D4AF37] text-[#0E282E] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                Most Popular
              </span>
              <div>
                <span className="text-xs uppercase tracking-wider text-[#EAD8B7] font-semibold block">VIP Cosmetic & Wellness</span>
                <div className="mt-3 mb-4">
                  <span className="text-4xl font-serif font-bold text-white">$65</span>
                  <span className="text-xs text-zinc-300"> / month</span>
                  <span className="block text-[11px] text-[#EAD8B7] mt-1">or $720 billed annually</span>
                </div>
                <ul className="space-y-2 text-xs text-zinc-200 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    <span>3 Professional Cleanings & Exams / year</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    <span>Annual Complimentary Take-Home Whitening</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    <span>25% off Porcelain Veneers & Crowns</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    <span>$500 credit toward Invisalign® Full Arch</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onOpenBooking()}
                className="w-full py-3 bg-[#EAD8B7] text-[#0E282E] font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-white transition-colors cursor-pointer"
              >
                Join VIP Wellness Plan
              </button>
            </div>

            {/* Plan 3: Children */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-zinc-300 font-semibold block">Child & Teen (Ages 0-14)</span>
                <div className="mt-3 mb-4">
                  <span className="text-4xl font-serif font-bold text-white">$29</span>
                  <span className="text-xs text-zinc-300"> / month</span>
                  <span className="block text-[11px] text-[#EAD8B7] mt-1">or $320 billed annually</span>
                </div>
                <ul className="space-y-2 text-xs text-zinc-200 mb-6">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#EAD8B7] flex-shrink-0" />
                    <span>2 Pediatric Cleanings & Gentle Exams</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#EAD8B7] flex-shrink-0" />
                    <span>2 Mineral Fluoride Enamel Varnish Treatments</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#EAD8B7] flex-shrink-0" />
                    <span>Preventive Dental Sealants (100% covered)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#EAD8B7] flex-shrink-0" />
                    <span>20% off all additional treatments</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onOpenBooking()}
                className="w-full py-3 bg-white text-[#0E282E] font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-[#EAD8B7] transition-colors cursor-pointer"
              >
                Join Child Plan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Insurance FAQ Accordion */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-[#5B7980] block mb-2">
            Have Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#0E282E]">
            Frequently Asked Questions on Fees & Coverage
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-zinc-200/90 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-zinc-900 hover:text-[#0E282E] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Concierge Desk CTA */}
        <div className="mt-12 p-8 rounded-2xl bg-white border border-zinc-200 text-center">
          <h3 className="text-lg font-serif font-semibold text-[#0E282E] mb-2">
            Want us to pre-verify your exact insurance policy benefits?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-lg mx-auto mb-6">
            Simply call our Austin concierge desk or submit a request online. We will contact your carrier and provide your exact coverage figures within 2 hours.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenBooking()}
              className="px-6 py-3 bg-[#0E282E] hover:bg-[#153B44] text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-md cursor-pointer"
            >
              Verify My Coverage Now
            </button>
            <a
              href={`tel:${CLINIC_INFO.phone}`}
              className="px-6 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold rounded-full"
            >
              Call {CLINIC_INFO.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
