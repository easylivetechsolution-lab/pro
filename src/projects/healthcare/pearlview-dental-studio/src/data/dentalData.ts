import { type ServiceItem, type Doctor, type TransformationItem, type Testimonial, type TechItem, type FaqItem } from '../types';

export const CLINIC_INFO = {
  name: 'PearlView Dental Studio',
  tagline: 'A smile you love to share, care you actually look forward to.',
  subtagline: 'Austin’s boutique dental sanctuary combining 3D digital precision, same-day ceramics, and spa-level sensory comfort with zero judgment.',
  address: '123 Wellness Drive, Austin, TX 78701',
  phone: '(512) 595-0187',
  email: 'concierge@pearlviewdental.com',
  hours: {
    weekdays: 'Mon - Fri: 8:00 AM - 6:00 PM',
    saturday: 'Sat: 8:00 AM - 2:00 PM',
    sunday: 'Closed (Emergency On-Call)',
  },
  rating: 5.0,
  reviewsCount: '500+',
  insuranceNote: 'We accept most major insurance plans | Flexible 0% APR financing available',
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'cosmetic',
    title: 'Cosmetic Dentistry',
    category: 'cosmetic',
    shortDesc: 'Whiter, straighter, more confident smiles with personalized cosmetic solutions.',
    fullDesc: 'Custom handcrafted porcelain veneers, professional Zoom! in-office laser whitening, and conservative cosmetic bonding designed for natural luminosity.',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop',
    iconName: 'Smile',
    timeline: '1 - 2 visits',
    recovery: 'Immediate',
    pricing: 'From $450 / tooth',
    features: [
      'Digital Smile Design preview',
      'Ultra-thin feldspathic porcelain',
      'Minimally invasive enamel preservation',
      'Custom shade matching to your complexion'
    ]
  },
  {
    id: 'implants',
    title: 'Dental Implants',
    category: 'restorative',
    shortDesc: 'Permanent, natural-looking replacement for missing teeth and restored function.',
    fullDesc: 'Computer-guided titanium and zirconia implant placement for lifetime durability, full chewing restoration, and jawbone preservation.',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop',
    iconName: 'ShieldCheck',
    timeline: '3 - 6 months total',
    recovery: '2 - 3 days mild soreness',
    pricing: 'Flexible monthly plans',
    features: [
      '3D Cone Beam CT surgical guides',
      'Grade 5 titanium & ceramic zirconia',
      'Same-day provisional teeth available',
      '98.7% long-term integration success'
    ]
  },
  {
    id: 'invisalign',
    title: 'Invisalign® Aligners',
    category: 'ortho',
    shortDesc: 'Clear aligners for a straighter smile — discreet, comfortable, convenient.',
    fullDesc: 'Custom medical-grade SmartTrack aligners that smoothly guide your teeth into pristine alignment without metal brackets or food restrictions.',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=800&auto=format&fit=crop',
    iconName: 'Smile',
    timeline: '6 - 14 months',
    recovery: 'Zero downtime',
    pricing: 'As low as $129 / month',
    features: [
      'iTero 5D digital scans (no gooey impressions)',
      'ClinCheck 3D outcome simulation',
      'Removable for meals and special events',
      'Includes complimentary post-treatment whitening'
    ]
  },
  {
    id: 'preventive',
    title: 'Preventive Care',
    category: 'preventive',
    shortDesc: 'Regular checkups, cleanings and early detection for long-term oral health.',
    fullDesc: 'Gentle ultrasonic hygiene, guided biofilm therapy, oral cancer screenings, and micro-cavity laser detection for lifelong oral wellness.',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop',
    iconName: 'HeartPulse',
    timeline: '60 minutes per visit',
    recovery: 'Immediate',
    pricing: '100% covered by most PPO plans',
    features: [
      'Comfort-first ultrasonic scaler',
      'Low-radiation HD digital x-rays',
      'Comprehensive periodontal screening',
      'Aromatherapy and heated neck warmers'
    ]
  },
  {
    id: 'restorative',
    title: 'Restorative Care',
    category: 'restorative',
    shortDesc: 'Crowns, inlays, and bridges crafted in-house with CEREC 3D precision.',
    fullDesc: 'Same-day ceramic crowns crafted while you relax in our private lounge, restoring natural strength and tooth anatomy seamlessly.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop',
    iconName: 'Activity',
    timeline: 'Single-visit available',
    recovery: 'Same day',
    pricing: 'Insurance accepted',
    features: [
      'Zero temporary crowns needed',
      'Precision optical mill within 45 minutes',
      'BPA-free biomimetic ceramic',
      'Color-matched translucent glazed finish'
    ]
  },
  {
    id: 'sedation',
    title: 'Comfort & Sedation',
    category: 'general',
    shortDesc: 'Anxiety-free dentistry with customized sedation and bespoke luxury amenities.',
    fullDesc: 'From soothing nitrous oxide to twilight oral conscious sedation, we make every procedure utterly calming and serene.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop',
    iconName: 'Coffee',
    timeline: 'Duration of procedure',
    recovery: 'Accompanied ride home',
    pricing: 'Complimentary consultation',
    features: [
      'Certified sedation dentistry',
      'Bose noise-canceling headphones & Netflix',
      'Warm lavender-scented towels',
      'Private recovery relaxation alcove'
    ]
  }
];

export const DOCTORS_DATA: Doctor[] = [
  {
    id: 'dr-michael-carter',
    name: 'Dr. Michael Carter',
    title: 'General & Cosmetic Dentist',
    experience: '16+ Years Experience',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop',
    education: 'DDS, University of Texas Health Science Center | AACD Accredited Fellow',
    specialty: 'Smile Makeovers, Full-Mouth Rehabilitation & Digital Aesthetics',
    philosophy: 'Dentistry is the union of biology, engineering, and delicate artistic proportion. We sculpt smiles that radiate authentic confidence.',
    signature: 'Dr. Michael Carter, DDS',
    isFeatured: true,
  },
  {
    id: 'dr-emily-roberts',
    name: 'Dr. Emily Roberts',
    title: 'Orthodontist',
    experience: '10+ Years Experience',
    image: 'https://images.unsplash.com/photo-1594824813501-48956972412e?q=80&w=800&auto=format&fit=crop',
    education: 'MS Orthodontics, Columbia University Dental Medicine',
    specialty: 'Invisalign VIP Diamond Provider, Airway Orthodontics',
    philosophy: 'Harmonious alignment does not just beautify a smile; it preserves jaw joints and enhances facial symmetry for decades.',
  },
  {
    id: 'dr-james-patel',
    name: 'Dr. James Patel',
    title: 'Restorative Dentist',
    experience: '12+ Years Experience',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format&fit=crop',
    education: 'DMD, Harvard School of Dental Medicine | ICOI Fellow',
    specialty: 'Computer-Guided Implantology, Biomimetic Restorations',
    philosophy: 'Preserving natural tooth structure while engineering bio-compatible restorations that feel completely indomitable.',
  },
  {
    id: 'dr-sarah-mitchell',
    name: 'Dr. Sarah Mitchell',
    title: 'Periodontist',
    experience: '8+ Years Experience',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop',
    education: 'DDS, Periodontics Certificate, NYU College of Dentistry',
    specialty: 'Laser Gum Contouring, Tissue Regeneration, Bone Grafting',
    philosophy: 'Healthy foundations create timeless beauty. Gentle laser micro-techniques allow painless recovery with exquisite pink aesthetics.',
  }
];

export const TRANSFORMATIONS_DATA: TransformationItem[] = [
  {
    id: 'whitening',
    title: 'In-Office Laser Whitening',
    category: 'Whitening',
    duration: '1 week (1 in-office session + touch-up tray)',
    description: 'Removed 8 shades of deep enamel coffee and tannin stains with gentle LED laser activation without sensitivity.',
    beforeImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop',
    patientAge: '34 years old',
    details: ['8 shades lighter on VITA scale', 'Zero tooth sensitivity formula', 'Enamel micro-polishing finish']
  },
  {
    id: 'invisalign',
    title: 'Invisalign® Clear Alignment',
    category: 'Orthodontics',
    duration: '8 months total',
    description: 'Corrected moderate anterior crowding and crossbite, restoring ideal arch symmetry and natural lip posture.',
    beforeImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=800&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop',
    patientAge: '28 years old',
    details: ['18 active aligner sets', 'No extractions needed', 'Vivera nighttime retainers included']
  },
  {
    id: 'veneers',
    title: 'Handcrafted Porcelain Veneers',
    category: 'Cosmetic',
    duration: '2 appointments (3 weeks)',
    description: 'Custom handcrafted 8-unit feldspathic porcelain veneers addressing micro-fractures, discoloration, and tooth shape.',
    beforeImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
    patientAge: '41 years old',
    details: ['Minimally prep veneers (0.3mm)', 'Custom translucency layered edge', 'Protected with custom nightguard']
  },
  {
    id: 'implants',
    title: 'Guided Dental Implant Restoration',
    category: 'Restorative',
    duration: '4 months healing',
    description: 'Replaced fractured upper bicuspid with computer-guided titanium implant and custom zirconia porcelain crown.',
    beforeImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    patientAge: '52 years old',
    details: ['3D CBCT digital plan', 'Exact gingival margin match', '100% restored bite force']
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'review-1',
    name: 'Sarah L.',
    initial: 'S',
    quote: 'The entire team is amazing! From the front desk to Dr. Carter, everyone made me feel comfortable and cared for. My new smile is better than I imagined.',
    service: 'Porcelain Veneers & Whitening',
    rating: 5,
    date: '3 weeks ago',
    verified: true,
  },
  {
    id: 'review-2',
    name: 'James T.',
    initial: 'J',
    quote: 'Professional, friendly and very thorough. I finally found a dental office in Austin I truly trust. The 3D scan instead of gooey impressions was a game-changer.',
    service: 'Comprehensive Exam & Cleaning',
    rating: 5,
    date: '1 month ago',
    verified: true,
  },
  {
    id: 'review-3',
    name: 'Emily R.',
    initial: 'E',
    quote: 'The staff is so kind and explains everything clearly. Highly recommend! The clinic feels like a boutique spa with heated blankets and soothing music.',
    service: 'Invisalign Treatment',
    rating: 5,
    date: '2 months ago',
    verified: true,
  },
  {
    id: 'review-4',
    name: 'Daniel K.',
    initial: 'D',
    quote: 'Beautiful office, great technology, and amazing results. Couldn’t be happier! Dr. Patel replaced a broken tooth seamlessly in a single afternoon.',
    service: 'CEREC Same-Day Crown',
    rating: 5,
    date: '3 months ago',
    verified: true,
  }
];

export const TECH_DATA: TechItem[] = [
  {
    id: 'scanner',
    name: 'Digital Scanners',
    tagline: 'No messy impressions. More accurate results.',
    description: 'Our 3Shape TRIOS intraoral scanner captures 3,000 HD color images per second, creating an exact 3D photorealistic replica of your teeth in under 60 seconds.',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop',
    comfortBenefit: 'Zero choking gag-reflex, instant outcome simulation',
  },
  {
    id: 'imaging',
    name: '3D CBCT Imaging',
    tagline: 'See the full picture. Plan with precision.',
    description: 'Ultra-low radiation cone beam tomographic scanning allows our surgeons to map bone density, nerves, and roots with sub-millimeter anatomical accuracy.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop',
    comfortBenefit: '80% less radiation than conventional hospital CTs',
  },
  {
    id: 'restorations',
    name: 'Same-Day Restorations',
    tagline: 'Get back to your smile faster.',
    description: 'German-engineered CEREC robotic diamond milling machines carve permanent monolithic ceramic crowns and inlays while you sip espresso in our lounge.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop',
    comfortBenefit: 'No temporary crowns, no second appointment injections',
  },
  {
    id: 'laser',
    name: 'Minimally Invasive Care',
    tagline: 'Less discomfort. More natural results.',
    description: 'Waterlase dental hydro-lasers treat soft tissue and prepare shallow cavities silently without vibration, heat, or need for heavy numbing in many cases.',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop',
    comfortBenefit: 'Near-zero bleeding and significantly accelerated healing',
  }
];

export const FAQS_DATA: FaqItem[] = [
  {
    question: 'How do I know which cosmetic treatment is right for me?',
    answer: 'During your initial consultation, we perform high-resolution digital photographic analysis and a 3D scan of your smile. We simulate before-and-after projections so you can see your projected results before any treatment begins.',
    category: 'Cosmetic'
  },
  {
    question: 'What insurance plans does PearlView Dental Studio accept?',
    answer: 'We accept and work seamlessly with all major PPO insurance providers including Delta Dental, MetLife, Cigna, Aetna, Guardian, and Humana. Our dedicated insurance coordinators handle claims directly so you receive maximum eligible benefits.',
    category: 'Insurance'
  },
  {
    question: 'Do you offer financing or payment plans?',
    answer: 'Yes! We partner with CareCredit, Sunbit, and Proceed Finance to provide 0% APR interest financing for up to 24 months, with approval rates over 90%. We also offer an in-house PearlView Membership Plan for uninsured patients.',
    category: 'Insurance'
  },
  {
    question: 'What amenities are provided for dental anxiety?',
    answer: 'We specialize in gentle, comfort-first dentistry. Every suite includes noise-canceling headphones with personalized streaming, heated massage memory-foam chairs, weighted blankets, warm aromatherapy towels, and nitrous oxide or oral sedation upon request.',
    category: 'General'
  },
  {
    question: 'How long does a first appointment take?',
    answer: 'A comprehensive new patient experience takes approximately 60 to 75 minutes. This includes your complete 3D digital imaging, periodontal wellness exam, oral cancer screening, gentle cleaning, and a one-on-one discussion with your dentist.',
    category: 'Appointments'
  },
  {
    question: 'How long do porcelain veneers last?',
    answer: 'With proper oral hygiene and regular biannual checkups, our custom handcrafted porcelain veneers typically last between 15 and 25 years. We use the highest quality dental ceramics backed by our studio guarantee.',
    category: 'Cosmetic'
  }
];
