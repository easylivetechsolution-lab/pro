import type { Product, HeroSlide, IncotermInfo, VaultDoc } from '../types';
import medicalProcurementHeroImg from '../assets/images/medical_supplies_procurement_1789275477946.jpg';
import surgicalMasksImg from '../assets/images/surgical_masks_box_1789276607978.jpg';
import nitrileGlovesImg from '../assets/images/nitrile_gloves_1789276687305.jpg';
import rapidTestKitImg from '../assets/images/rapid_test_kit_1789276620173.jpg';
import surgicalSetImg from '../assets/images/surgical_set_1789276632529.jpg';
import ivInfusionSetImg from '../assets/images/iv_infusion_set_1789276645839.jpg';
import n95RespiratorImg from '../assets/images/n95_respirators_1789276700703.jpg';
import bloodTubesImg from '../assets/images/blood_tubes_1789276660792.jpg';
import operatingTableImg from '../assets/images/operating_table_1789276675099.jpg';

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    badge: 'HEARTS AND MIND MEDICAL EXPORT LLC',
    title: 'Connecting Certified Manufacturers with Healthcare Systems Worldwide',
    subtitle: 'Your trusted B2B partner for global medical supply distribution and international trade logistics. Quality products, Compliant processes, Reliable delivery.',
    image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=2000&q=85', // Air cargo jetliner and sunset runway
    tag: 'GLOBAL MEDICAL SUPPLY DISTRIBUTION & LOGISTICS',
    highlight: 'Active Multimodal Routes Across 48+ Nations',
    metric: { value: '250M+', label: 'Sterile Units Exported' }
  },
  {
    id: 2,
    badge: 'B2B SOURCING & QUALITY ASSURANCE',
    title: 'Certified Medical Consumables Direct From Audited Facilities',
    subtitle: 'Streamlined procurement for national ministries of health, hospital networks, and bulk distributors with complete FDA, CE, and ISO compliance.',
    image: medicalProcurementHeroImg, // High-tech medical logistics warehouse with sterile supplies
    tag: 'FACTORY-DIRECT INSTITUTIONAL PRICING',
    highlight: 'Zero Counterfeits Guarantee via Lot Traceability',
    metric: { value: '120+', label: 'Audited Global Manufacturers' }
  },
  {
    id: 3,
    badge: 'INTERNATIONAL TRADE MANAGEMENT',
    title: 'Specialized CPT Freight & Cross-Border Risk Navigation',
    subtitle: 'We simplify Carriage Paid To (CPT) and global trade logistics. From export customs and international air/ocean charters to destination delivery.',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2000&q=85', // Cargo container vessel at port with sunset & crane logistics
    tag: 'CLEAR INCOTERMS RESPONSIBILITIES',
    highlight: 'Pre-Cleared Customs Documentation & Marine Insurance',
    metric: { value: '99.8%', label: 'On-Time Port Clearance' }
  },
  {
    id: 4,
    badge: 'INSTITUTIONAL SUPPLY CONTINUITY',
    title: 'Rapid Deployment of Critical PPE, Testing & Surgical Kits',
    subtitle: 'Emergency stockpile allocations and scheduled monthly bulk shipments tailored to government tenders and large hospital consortiums.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=85', // High-tech medical logistics warehouse with pallets
    tag: 'CRITICAL HEALTHCARE INFRASTRUCTURE',
    highlight: 'Cold-Chain & Secure Palletized Freight Protocols',
    metric: { value: '< 24h', label: 'RFQ Institutional Turnaround' }
  }
];

export const TRUST_METRICS = [
  {
    title: 'Audited Manufacturers',
    description: 'Quality & Compliance Assured',
    detail: '120+ audited factories adhering strictly to cGMP, ISO 13485 & FDA quality standards.'
  },
  {
    title: 'Global Freight Partners',
    description: 'Air • Ocean • Truck • Rail',
    detail: 'Contracted vessel space & chartered air freight ensuring priority container routing.'
  },
  {
    title: 'Hospitals & Healthcare Systems',
    description: 'Serving Hospitals, Clinics & Networks',
    detail: 'Direct institutional supply lines reducing intermediary markups by up to 28%.'
  },
  {
    title: 'Government Agencies',
    description: 'Trusted by Public Sector & Buyers',
    detail: 'Compliant tender documentation, transparent Incoterms, and audited export manifests.'
  },
  {
    title: 'Distributors & Wholesalers',
    description: 'Global Distribution Network',
    detail: 'Tiered volume pricing, custom OEM packaging, and dedicated trade account reps.'
  }
];

export const CATEGORY_CARDS = [
  {
    id: 'consumables',
    title: 'Medical Consumables',
    description: 'Syringes, needles, IV sets, wound care, catheters, and sterile gauze.',
    image: 'https://images.unsplash.com/photo-1583912267670-6575ad472688?auto=format&fit=crop&w=800&q=80',
    itemCount: '140+ SKUs'
  },
  {
    id: 'ppe',
    title: 'PPE & Protective Gear',
    description: 'Masks, gloves, gowns, face shields, respirators, and shoe covers.',
    image: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=800&q=80',
    itemCount: '85+ SKUs'
  },
  {
    id: 'surgical',
    title: 'Surgical Tools & Equipment',
    description: 'Scalpels, forceps, surgical kits, operating room supplies & retractors.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    itemCount: '210+ SKUs'
  },
  {
    id: 'diagnostics',
    title: 'Diagnostics & Lab Supplies',
    description: 'Rapid tests, reagents, lab equipment, vacuum tubes & culture media.',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
    itemCount: '110+ SKUs'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    name: 'Surgical Face Mask (3-Ply)',
    category: 'ppe',
    categoryLabel: 'PPE & Protective Gear',
    image: surgicalMasksImg,
    moq: '10,000 pcs',
    moqNumber: 10000,
    packaging: '50 pcs/box, 20 boxes/carton',
    compliance: ['FDA', 'CE', 'ISO'],
    description: 'Premium medical-grade 3-ply pleated earloop masks with meltblown polypropylene filtration core. BFE ≥ 98%, PFE ≥ 98%, fluid-resistant Type IIR compliant.',
    specs: {
      'Filtration Efficiency': 'BFE ≥ 98%, PFE ≥ 98%',
      'Standard': 'EN 14683 Type IIR / ASTM F2100 Level 2',
      'Material': 'Spunbond PP + Meltblown PP + Spunbond PP',
      'Sterility': 'Non-sterile (Sterile available on request)'
    },
    leadTime: '7 - 14 business days',
    inStock: true,
    featured: true
  },
  {
    id: 'prod-02',
    name: 'Nitrile Examination Gloves',
    category: 'ppe',
    categoryLabel: 'PPE & Protective Gear',
    image: nitrileGlovesImg,
    moq: '10,000 pcs',
    moqNumber: 10000,
    packaging: '100 pcs/box, 10 boxes/carton',
    compliance: ['FDA', 'CE', 'ISO'],
    description: 'Powder-free, textured fingertips nitrile examination gloves designed for superior tactile sensitivity and chemical resistance. AQL 1.5 medical standard.',
    specs: {
      'Pin Hole Level': 'AQL 1.5 Medical Grade',
      'Tensile Strength': '≥ 14 MPa (Before Aging)',
      'Sizes Available': 'XS, S, M, L, XL',
      'Certifications': 'FDA 510(k), EN 455 Parts 1-4, EN ISO 374'
    },
    leadTime: '10 - 20 business days',
    inStock: true,
    featured: true
  },
  {
    id: 'prod-03',
    name: 'COVID-19 Rapid Test Kit',
    category: 'diagnostics',
    categoryLabel: 'Diagnostics & Lab Supplies',
    image: rapidTestKitImg,
    moq: '5,000 kits',
    moqNumber: 5000,
    packaging: '1 kit/box, 200 boxes/carton',
    compliance: ['FDA', 'CE', 'WHO'],
    description: 'Point-of-care chromatographic immunoassay for the rapid qualitative detection of SARS-CoV-2 and Influenza A/B nucleocapsid protein in nasal swabs within 15 minutes.',
    specs: {
      'Sensitivity': '97.2% Clinical Sensitivity',
      'Specificity': '99.4% Clinical Specificity',
      'Result Time': '15 Minutes',
      'Storage Temperature': '2°C to 30°C (36°F to 86°F)'
    },
    leadTime: '5 - 10 business days',
    inStock: true,
    featured: true
  },
  {
    id: 'prod-04',
    name: 'Surgical Instrument Set',
    category: 'surgical',
    categoryLabel: 'Surgical Tools & Equipment',
    image: surgicalSetImg,
    moq: '100 sets',
    moqNumber: 100,
    packaging: '1 set/box, 10 boxes/carton',
    compliance: ['FDA', 'CE', 'ISO'],
    description: 'German-grade surgical stainless steel instrument collection for general and laparotomy procedures. Includes Metzenbaum scissors, Kelly clamps, retractors, and scalpel handles.',
    specs: {
      'Steel Grade': 'AISI 420 / 440 German Surgical Stainless Steel',
      'Autoclave Resistant': 'Yes (Up to 134°C / 273°F)',
      'Kit Contents': '54 Precision Instruments + Sterilization Tray',
      'Anti-Corrosion': 'Passivated electrolytic satin finish'
    },
    leadTime: '15 - 25 business days',
    inStock: true,
    featured: true
  },
  {
    id: 'prod-05',
    name: 'Sterile IV Infusion Set with Flow Regulator',
    category: 'consumables',
    categoryLabel: 'Medical Consumables',
    image: ivInfusionSetImg,
    moq: '25,000 pcs',
    moqNumber: 25000,
    packaging: '1 pc/PE pouch, 500 pouches/carton',
    compliance: ['FDA', 'CE', 'ISO'],
    description: 'Gravity intravenous infusion administration set with precise dial-a-flow regulator, Y-injection site, 15-micron fluid filter, and luer lock connector.',
    specs: {
      'Drop Rate': '20 drops/ml or 60 drops/ml (micro)',
      'Tube Length': '150 cm to 200 cm medical grade PVC',
      'Sterilization': 'EO Gas (Ethylene Oxide)',
      'Latex Free': '100% DEHP & Latex-Free'
    },
    leadTime: '14 - 21 business days',
    inStock: true
  },
  {
    id: 'prod-06',
    name: 'N95 / FFP2 Particulate Healthcare Respirator',
    category: 'ppe',
    categoryLabel: 'PPE & Protective Gear',
    image: n95RespiratorImg,
    moq: '10,000 pcs',
    moqNumber: 10000,
    packaging: '20 pcs/box, 24 boxes/carton (480 pcs/ctn)',
    compliance: ['FDA', 'CE', 'ISO', 'WHO'],
    description: 'Cone-shaped molded respirator providing ≥ 95% filtration against solid and liquid aerosols free of oil. Heavy-duty headbands and adjustable aluminum nose clip.',
    specs: {
      'Efficiency': 'PFE ≥ 95% at 0.3 micron particles',
      'Standard': 'NIOSH 42 CFR 84 N95 / EN 149:2001+A1:2009 FFP2',
      'Design': 'Foldable or Molded Cup with foam cushion',
      'Fluid Resistance': '160 mmHg ASTM F1862'
    },
    leadTime: '7 - 12 business days',
    inStock: true
  },
  {
    id: 'prod-07',
    name: 'Blood Collection Vacuum Tubes (EDTA K2/K3)',
    category: 'diagnostics',
    categoryLabel: 'Diagnostics & Lab Supplies',
    image: bloodTubesImg,
    moq: '50,000 pcs',
    moqNumber: 50000,
    packaging: '100 pcs/rack, 12 racks/carton (1,200 pcs/ctn)',
    compliance: ['FDA', 'CE', 'ISO'],
    description: 'Precision vacuum draw specimen collection tubes with lavender Hemogard safety caps for clinical hematology testing and blood cell morphology.',
    specs: {
      'Additive': 'Dipottasium EDTA (K2 EDTA) spray dried',
      'Draw Volumes': '2.0 ml, 3.0 ml, 4.0 ml, 5.0 ml',
      'Tube Material': 'Medical grade PET or Borosilicate Glass',
      'Centrifugation': '≤ 1300 g for 10 minutes at 25°C'
    },
    leadTime: '12 - 18 business days',
    inStock: true
  },
  {
    id: 'prod-08',
    name: 'Hydraulic Multi-Function Operating Table',
    category: 'furniture',
    categoryLabel: 'Hospital Furniture & Equipment',
    image: operatingTableImg,
    moq: '5 units',
    moqNumber: 5,
    packaging: 'Reinforced ocean export wooden crate (1 unit/crate)',
    compliance: ['FDA', 'CE', 'ISO'],
    description: 'Heavy-duty electro-hydraulic surgical operating table with 360° C-arm radiolucent table surface, Trendelenburg adjustment, and battery backup.',
    specs: {
      'Max Load Capacity': '300 kg (660 lbs)',
      'Elevation Range': '680 mm to 1,000 mm',
      'Table Tilt': 'Trendelenburg ≥ 25°, Lateral Tilt ≥ 20°',
      'Surface': 'Seamless antistatic memory polyurethane mattress'
    },
    leadTime: '25 - 35 business days',
    inStock: true
  },
  {
    id: 'prod-09',
    name: 'Digital Infusion Pump (Dual Channel)',
    category: 'surgical',
    categoryLabel: 'Surgical Tools & Equipment',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    moq: '10 units',
    moqNumber: 10,
    packaging: '1 unit/carton with padded foam protection',
    compliance: ['FDA', 'CE', 'ISO'],
    description: 'Advanced volumetric infusion pump with dual independent channels, anti-bolus system, drug library, and audible/visual occlusion alarms.',
    specs: {
      'Infusion Rate': '0.1 to 1500 ml/h in 0.1 ml increments',
      'Accuracy': '± 2% volumetric accuracy',
      'Display': '4.3 inch TFT color touch screen',
      'Battery Backup': 'Lithium-ion battery for up to 6 hours continuous operation'
    },
    leadTime: '10 - 15 business days',
    inStock: true,
    featured: true
  },
  {
    id: 'prod-10',
    name: 'Disposable Vinyl Medical Examination Gloves',
    category: 'ppe',
    categoryLabel: 'PPE & Protective Gear',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    moq: '20,000 pcs',
    moqNumber: 20000,
    packaging: '100 pcs/box, 10 boxes/carton',
    compliance: ['FDA', 'CE', 'ISO'],
    description: 'Cost-effective PVC / synthetic vinyl examination gloves, powder-free and latex-free, designed for low-risk clinical examinations and food handling.',
    specs: {
      'Thickness': '0.08 mm palm thickness',
      'AQL': 'AQL 2.5 Medical Standard',
      'Surface': 'Smooth finish with beaded cuff',
      'Material': 'Polyvinyl chloride compound'
    },
    leadTime: '7 - 14 business days',
    inStock: true
  },
  {
    id: 'prod-11',
    name: 'Heavy-Duty Hospital Patient Stretcher Trolley',
    category: 'furniture',
    categoryLabel: 'Hospital Furniture & Equipment',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    moq: '3 units',
    moqNumber: 3,
    packaging: 'Wooden palletized export crate',
    compliance: ['FDA', 'CE', 'ISO'],
    description: 'Hydraulic emergency trauma stretcher with centralized braking system, 5th steering wheel, oxygen cylinder holder, and IV pole.',
    specs: {
      'Max Safe Load': '250 kg (550 lbs)',
      'Backrest Tilt': '0° to 75° pneumatic control',
      'Castor Diameter': '200 mm silent castors with central brake',
      'Mattress': 'Waterproof high-density foam with antibacterial cover'
    },
    leadTime: '20 - 30 business days',
    inStock: true
  },
  {
    id: 'prod-12',
    name: 'Sterile Surgical Scalpel Blades (Carbon Steel)',
    category: 'surgical',
    categoryLabel: 'Surgical Tools & Equipment',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
    moq: '5,000 pcs',
    moqNumber: 5000,
    packaging: '100 pcs/box, 50 boxes/carton',
    compliance: ['FDA', 'CE', 'ISO'],
    description: 'Individually foil-peel pouched sterile surgical blades manufactured from high-grade British carbon steel. Available in sizes #10, #11, #12, #15, #20, #22.',
    specs: {
      'Material': 'Carbon steel or stainless steel options',
      'Sterilization': 'Gamma Irradiation 25 kGy',
      'Sharpening': 'V-ground edge with micro-hardness 800+ HV',
      'Compatibility': 'Fits standard handles #3, #4, #7'
    },
    leadTime: '7 - 12 business days',
    inStock: true
  },
  {
    id: 'prod-13',
    name: 'Automated Clinical Chemistry Analyzer Reagent Kit',
    category: 'diagnostics',
    categoryLabel: 'Diagnostics & Lab Supplies',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
    moq: '50 kits',
    moqNumber: 50,
    packaging: 'Insulated cold-chain box with gel ice packs',
    compliance: ['FDA', 'CE', 'ISO'],
    description: 'Comprehensive liquid stable reagent test kit for liver function, lipid profile, and renal biomarkers compatible with high-throughput analyzers.',
    specs: {
      'Storage': '2°C to 8°C cold-chain required',
      'Assay Range': 'Enzymatic rate and endpoint assays',
      'Shelf Life': '18 months from date of manufacture',
      'Packaging': 'Individual bottle sets for multi-channel analyzers'
    },
    leadTime: '10 - 15 business days',
    inStock: true,
    featured: true
  },
  {
    id: 'prod-14',
    name: 'Disposable Silicone Foley Catheter (2-Way)',
    category: 'consumables',
    categoryLabel: 'Medical Consumables',
    image: 'https://images.unsplash.com/photo-1583912267670-6575ad472688?auto=format&fit=crop&w=800&q=80',
    moq: '5,000 pcs',
    moqNumber: 5000,
    packaging: '1 pc/blister pouch, 10 pouches/box, 10 boxes/carton',
    compliance: ['FDA', 'CE', 'ISO'],
    description: '100% medical-grade silicone indwelling urinary catheter designed for long-term catheterization with minimal tissue irritation and encrustation.',
    specs: {
      'Sizes': 'Fr 6 to Fr 24 color-coded valve',
      'Balloon Capacity': '5ml / 10ml / 30ml symmetric balloon',
      'Sterilization': 'EO Gas sterilized',
      'Indwelling Time': 'Up to 30 days'
    },
    leadTime: '10 - 18 business days',
    inStock: true
  }
];

export const INCOTERMS_DATA: IncotermInfo[] = [
  {
    code: 'CPT',
    name: 'Carriage Paid To',
    fullName: 'Carriage Paid To (Named Place of Destination)',
    tagline: 'Hearts & Mind Core Recommended Term for Maximum Clarity',
    freightPayer: 'Seller',
    riskTransfer: 'Transfers to Buyer once handed over to first international carrier',
    insurancePayer: 'Optional (Seller or Buyer per contract)',
    customsExport: 'Seller',
    customsImport: 'Buyer',
    bestFor: 'Multimodal freight (Air + Ocean + Truck) with certified institutional buyers seeking transparent landed logistics.',
    overview: 'Under CPT, Hearts and Mind Medical Export LLC arranges and pays for freight transport of medical supplies to your designated destination terminal, port, or airport. Risk of transit loss transfers to the buyer upon handover to the first carrier.',
    sellerDuties: [
      'Source compliant supplies & verify factory QA/QC',
      'Export packaging & dangerous goods classification',
      'Export customs clearance, permits & port charges',
      'Freight transportation costs all the way to destination terminal'
    ],
    buyerDuties: [
      'Import licenses, destination customs clearance & local tariffs',
      'Transit insurance (unless upgraded to CIP terms)',
      'Unloading at destination terminal and final hospital transport',
      'Risk of damage during transit once handed to first carrier'
    ],
    keyRiskTransferPoint: 'Factory loading / carrier handover terminal at origin'
  },
  {
    code: 'CIF',
    name: 'Cost, Insurance and Freight',
    fullName: 'Cost, Insurance and Freight (Named Port of Destination)',
    tagline: 'Traditional Ocean Maritime Supply Term with Marine Insurance',
    freightPayer: 'Seller',
    riskTransfer: 'Transfers to Buyer once loaded aboard ship at origin port',
    insurancePayer: 'Seller',
    customsExport: 'Seller',
    customsImport: 'Buyer',
    bestFor: 'High-volume containerized ocean cargo where institutional buyers require baseline cargo insurance included.',
    overview: 'The seller pays the costs of ocean freight and procures baseline marine cargo insurance (Institute Cargo Clauses C) covering the buyer’s risk during sea transit.',
    sellerDuties: [
      'Pay ocean freight to destination port',
      'Procure minimum marine cargo insurance policy',
      'Clear goods for export at origin port',
      'Provide clean on-board Bill of Lading'
    ],
    buyerDuties: [
      'Destination port handling charges (THC)',
      'Import customs clearance, duties & taxes',
      'Onward transport from seaport to warehouse'
    ],
    keyRiskTransferPoint: 'When goods pass ship rail / placed aboard vessel at loading port'
  },
  {
    code: 'FOB',
    name: 'Free On Board',
    fullName: 'Free On Board (Named Port of Shipment)',
    tagline: 'Buyer Controls Own Charter Vessels & Ocean Rates',
    freightPayer: 'Buyer',
    riskTransfer: 'Transfers to Buyer once loaded onto vessel at origin port',
    insurancePayer: 'Buyer',
    customsExport: 'Seller',
    customsImport: 'Buyer',
    bestFor: 'Government procurement ministries and bulk distributors who maintain their own global freight forwarding contracts.',
    overview: 'Seller delivers goods across the ship’s rail at the named port of departure. Buyer arranges ocean carriage, pays freight, and assumes all transit risks.',
    sellerDuties: [
      'Deliver goods to designated departure seaport',
      'Load goods onto buyer’s nominated vessel',
      'Clear export customs in country of origin'
    ],
    buyerDuties: [
      'Contract ocean freight carriage & pay shipping rates',
      'Procure cargo transit insurance',
      'Handle destination import clearance and inland trucking'
    ],
    keyRiskTransferPoint: 'Onboard vessel at export port'
  },
  {
    code: 'DDP',
    name: 'Delivered Duty Paid',
    fullName: 'Delivered Duty Paid (Named Place of Destination)',
    tagline: 'Turnkey Door-to-Door Delivery to Hospital Warehouse',
    freightPayer: 'Seller',
    riskTransfer: 'Transfers to Buyer upon arrival at buyer facility ready for unloading',
    insurancePayer: 'Seller',
    customsExport: 'Seller',
    customsImport: 'Seller',
    bestFor: 'Direct hospital deliveries where the buying institution requires zero customs involvement or logistics management.',
    overview: 'Maximum obligation for the seller. Hearts & Mind handles export, international freight, import duties, customs clearance, and inland trucking direct to your hospital dock.',
    sellerDuties: [
      'Handle 100% of international shipping and freight',
      'Pay export and import customs clearance, VAT, and duties',
      'Coordinate door-to-door ground transit to hospital'
    ],
    buyerDuties: [
      'Unload goods from delivery truck at designated facility',
      'Conduct receiving inspection and sign delivery receipt'
    ],
    keyRiskTransferPoint: 'At destination buyer’s unloading bay'
  }
];

export const FLIPPER_CARDS_DATA = [
  {
    id: 'cpt-flipper',
    title: 'CPT Protocol: Carriage Paid To',
    category: 'Incoterms 2020 Architecture',
    frontHighlight: 'Seller pays transport to destination; Risk transfers at origin.',
    frontPoints: [
      'Direct freight payment handled by Hearts & Mind',
      'No surprise port demurrage fees at origin',
      'Ideal for multimodal container shipping & air cargo'
    ],
    backTitle: 'Detailed CPT Responsibility Matrix',
    backDuties: [
      { role: 'Hearts & Mind (Seller)', duty: 'Pays air/ocean freight to destination terminal; provides commercial invoice & bill of lading.' },
      { role: 'Institutional Buyer', duty: 'Clears destination import customs & pays local duties/taxes; assumes transit risk from first carrier.' },
      { role: 'Risk Boundary Point', duty: 'Transfers at carrier handover terminal at export hub.' }
    ],
    tag: 'Core Incoterm'
  },
  {
    id: 'qa-flipper',
    title: 'Audited Manufacturer Vetting',
    category: 'Factory Due Diligence',
    frontHighlight: '5-tier facility vetting to eliminate counterfeit supplies.',
    frontPoints: [
      'On-site ISO 13485 & cGMP facility inspection',
      'Third-party SGS / TÜV laboratory batch assays',
      'Unbroken chain of custody from cleanroom to crate'
    ],
    backTitle: 'Compliance Quality Protocol',
    backDuties: [
      { role: 'Tier 1: Legal Registration', duty: 'Medical device manufacturing licenses & FDA establishment registration.' },
      { role: 'Tier 2: Production Audit', duty: 'Class 100,000 cleanroom air particle count & autoclave calibration.' },
      { role: 'Tier 3: Lot Testing', duty: 'Random pull pre-shipment inspection (PSI) with AQL 1.0/1.5 standards.' }
    ],
    tag: 'Quality Shield'
  },
  {
    id: 'risk-flipper',
    title: 'Cross-Border Risk Transfer',
    category: 'Trade Logistics Navigation',
    frontHighlight: 'Eliminating legal ambiguities in cross-border medical shipments.',
    frontPoints: [
      'Transparent contract alignment with ICC Incoterms rules',
      'Optional Institute Cargo Clauses (A) all-risk insurance',
      'Escrow payment security for high-value government tenders'
    ],
    backTitle: 'Risk Mitigation Architecture',
    backDuties: [
      { role: 'Documentation Match', duty: 'Pro-forma, Packing List, Certificate of Origin & Bill of Lading in strict harmony.' },
      { role: 'Cold-Chain Telemetry', duty: 'GPS & temperature data loggers included for biological reagents & vaccines.' },
      { role: 'Force Majeure Buffers', duty: 'Pre-negotiated port diversion clauses to bypass geopolitical bottlenecks.' }
    ],
    tag: 'Risk Shield'
  }
];

export const VAULT_DOCUMENTS: VaultDoc[] = [
  {
    id: 'doc-01',
    title: 'FDA 510(k) Clearance Summary - Examination Gloves & Surgical Drapes',
    code: 'K210892-MED',
    category: 'FDA',
    date: '2025-11-14',
    fileSize: '2.4 MB',
    issuer: 'U.S. Food & Drug Administration (CDRH)',
    status: 'Audited',
    summary: 'Substantial equivalence determination under Section 510(k) for Class I & II medical patient examination gloves and sterile barrier drapes.'
  },
  {
    id: 'doc-02',
    title: 'CE Declaration of Conformity - EU MDR 2017/745 Annex IX',
    code: 'CE-MDR-88902',
    category: 'CE',
    date: '2026-02-18',
    fileSize: '3.1 MB',
    issuer: 'TÜV SÜD Notified Body 0123',
    status: 'Active',
    summary: 'Full Quality Assurance System certification complying with Regulation (EU) 2017/745 on Medical Devices for Class Is, IIa and IIb medical consumables.'
  },
  {
    id: 'doc-03',
    title: 'ISO 13485:2016 Medical Devices Quality Management System Certificate',
    code: 'ISO-MD-94021',
    category: 'ISO',
    date: '2026-01-05',
    fileSize: '1.8 MB',
    issuer: 'BSI Group Assurance (UKAS)',
    status: 'Valid 2026',
    summary: 'Comprehensive audit verifying design, production, packaging and export quality control for sterile and non-sterile medical devices.'
  },
  {
    id: 'doc-04',
    title: 'Material Safety Data Sheet (MSDS) - Nitrile Polymer & Accelerators',
    code: 'MSDS-NIT-2026',
    category: 'MSDS',
    date: '2026-03-01',
    fileSize: '950 KB',
    issuer: 'Global Chemical Safety Standards (GHS)',
    status: 'Audited',
    summary: 'Toxicological assessment, chemical inertness, latex-free protein verification, and safe disposal guidelines.'
  },
  {
    id: 'doc-05',
    title: 'Standard Carriage Paid To (CPT) Master Export Terms Agreement',
    code: 'HMM-CPT-SPEC-26',
    category: 'Trade',
    date: '2026-02-10',
    fileSize: '1.2 MB',
    issuer: 'Hearts and Mind Medical Export LLC Legal Dept',
    status: 'Active',
    summary: 'Detailed operational clause guidelines explaining freight payment schedules, risk handover protocols, and port carrier receipts.'
  }
];

export const LIVE_TRADE_UPDATES = [
  '⚡ Air Cargo Dispatch: 400,000 N95 respirators cleared Frankfurt Hub (FRA) via CPT terms',
  '🚢 Ocean Vessel MSC Savannah: 4x 40ft High-Cube containers of Nitrile Gloves en route to Port of New Orleans',
  '✅ ISO 13485 Annual Renewal confirmed for Surgical Instruments manufacturing plant',
  '✈️ Express Air Charter: 15,000 Rapid Diagnostic Test Kits landed at Bogota El Dorado (BOG)',
  '📋 FDA 510(k) lot release approved for Batch #26-HM08 medical consumables'
];
