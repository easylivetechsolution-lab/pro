export interface FarmEstate {
  id: string;
  name: string;
  acres: number;
  crops: string[];
  location: string;
  coordinates: [number, number]; // [lat, lng]
  xPercent: number; // For interactive SVG map positioning
  yPercent: number;
  climate: string;
  elevation: string;
  soilType: string;
  certifications: string[];
  imageUrl: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: 'Grains' | 'Fruits' | 'Vegetables' | 'Livestock' | 'Nursery & Seedlings' | 'Specialty Crops';
  subtitle: string;
  description: string;
  yieldPerAcre: string;
  harvestSeason: string;
  originEstate: string;
  certifications: string[];
  imageUrl: string;
}

export interface SensorNode {
  id: string;
  title: string;
  value: string;
  subtext: string;
  status: 'optimal' | 'active' | 'warning';
  icon: string;
  x: number; // percentage
  y: number; // percentage
  details: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  tagline: string;
  description: string;
  metric: string;
  duration: string;
  imageUrl: string;
}

export interface TeamMember {
  name: string;
  role: string;
  credentials: string;
  quote?: string;
  bio: string;
  imageUrl: string;
}

export interface BatchRecord {
  batchId: string;
  productName: string;
  variety: string;
  estate: string;
  harvestDate: string;
  packDate: string;
  brixLevel: string;
  pesticideResidue: string;
  tempControlled: string;
  qrCodeUrl?: string;
  verified: boolean;
}

export interface StoryArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  content: string;
  imageUrl: string;
}
