import type { AddOnId, CleaningFrequency, QuoteBreakdown, QuoteInput, ServiceType } from '../types/cleaning';

export interface ServiceCatalogItem {
  id: ServiceType;
  index: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  startingPrice: number;
  baseHours: number;
  highlights: string[];
}

export const SERVICE_CATALOG: ServiceCatalogItem[] = [
  {
    id: 'home',
    index: '01',
    title: 'Home Cleaning',
    shortTitle: 'Home',
    tagline: 'Recurring or single-visit sanctuary care',
    description:
      'Hospital-grade botanical formulas, microfiber color-zoning, and quiet precision across kitchens, baths, bedrooms, and living areas.',
    startingPrice: 149,
    baseHours: 2.5,
    highlights: ['Eco-certified botanical solutions', 'HEPA-filtered dust extraction', 'Dedicated 2-specialist team'],
  },
  {
    id: 'office',
    index: '02',
    title: 'Office & Commercial',
    shortTitle: 'Office',
    tagline: 'After-hours suites, glass & conference care',
    description:
      'Low-VOC workspace sanitization for modern studios, medical suites, and executive floors with streak-free glass partition polishing.',
    startingPrice: 219,
    baseHours: 3.0,
    highlights: ['After-hours & weekend slots', 'Glass wall & chrome detailing', 'Insured up to $5M liability'],
  },
  {
    id: 'deep',
    index: '03',
    title: 'Deep Sanitization',
    shortTitle: 'Deep Clean',
    tagline: 'Baseboards, grout, vents & fixture reset',
    description:
      'Comprehensive top-to-bottom restoration targeting built-up scale, cabinet faces, vents, window sills, and high-touch architectural trim.',
    startingPrice: 259,
    baseHours: 4.5,
    highlights: ['Steam & descaling treatment', 'Hand-wiped trim & cabinetry', '48-hour spotless guarantee'],
  },
  {
    id: 'move-out',
    index: '04',
    title: 'Move-Out Turnover',
    shortTitle: 'Move-Out',
    tagline: 'Inspection-ready empty residence reset',
    description:
      'Built for landlords, property managers, and closing day turnovers. Every drawer, closet track, oven cavity, and floor edge restored.',
    startingPrice: 319,
    baseHours: 5.5,
    highlights: ['Inside cabinets & closets', 'Inspection checklist sign-off', 'Same-week rapid dispatch'],
  },
];

export const ADD_ON_CATALOG: { id: AddOnId; label: string; price: number; hours: number }[] = [
  { id: 'inside-oven', label: 'Inside Oven Detailing', price: 45, hours: 0.6 },
  { id: 'inside-fridge', label: 'Inside Fridge & Seals', price: 40, hours: 0.5 },
  { id: 'interior-windows', label: 'Interior Glass & Tracks', price: 65, hours: 0.9 },
  { id: 'steam-sanitize', label: '212°F Steam Tile & Grout', price: 75, hours: 1.0 },
];

export const FREQUENCY_DISCOUNTS: Record<CleaningFrequency, { label: string; rate: number }> = {
  'one-time': { label: 'One-Time Visit', rate: 0 },
  monthly: { label: 'Monthly (-10%)', rate: 0.1 },
  'bi-weekly': { label: 'Bi-Weekly (-15%)', rate: 0.15 },
  weekly: { label: 'Weekly (-20%)', rate: 0.2 },
};

export function calculateQuote(input: QuoteInput, referralValid = false): QuoteBreakdown {
  const service = SERVICE_CATALOG.find((s) => s.id === input.serviceType) ?? SERVICE_CATALOG[0];
  const clampedSqft = Math.max(500, Math.min(8000, Math.round(input.sqft || 1500)));
  const clampedRooms = Math.max(1, Math.min(16, Math.round(input.rooms || 3)));

  const basePrice = service.startingPrice;
  const extraSqft = Math.max(0, clampedSqft - 1200);
  const sizeAdjustment = Math.round((extraSqft / 250) * 18);
  const roomsAdjustment = Math.max(0, clampedRooms - 2) * 22;

  const selectedAddOns = ADD_ON_CATALOG.filter((a) => input.addOns.includes(a.id));
  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  const addOnHours = selectedAddOns.reduce((sum, a) => sum + a.hours, 0);

  const subtotal = basePrice + sizeAdjustment + roomsAdjustment + addOnsTotal;
  const freqRate = FREQUENCY_DISCOUNTS[input.frequency]?.rate ?? 0;
  const frequencyDiscount = Math.round(subtotal * freqRate);
  const referralDiscount = referralValid ? 35 : 0;

  const finalPrice = Math.max(99, subtotal - frequencyDiscount - referralDiscount);
  const rawHours = service.baseHours + extraSqft / 750 + Math.max(0, clampedRooms - 3) * 0.4 + addOnHours;
  const crewSize = rawHours > 5.5 || clampedSqft >= 3000 ? 3 : 2;
  const estimatedHours = Math.round((rawHours / (crewSize === 3 ? 1.35 : 1)) * 10) / 10;

  return {
    serviceType: service.id,
    serviceLabel: service.title,
    basePrice,
    sizeAdjustment,
    roomsAdjustment,
    addOnsTotal,
    subtotal,
    frequencyDiscount,
    referralDiscount,
    finalPrice,
    estimatedHours,
    crewSize,
    appliedReferralCode: referralValid && input.referralCode ? input.referralCode.trim().toUpperCase() : undefined,
    referralValid,
  };
}
