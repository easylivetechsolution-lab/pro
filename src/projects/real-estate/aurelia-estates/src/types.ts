export interface Property {
  id: string;
  title: string;
  location: string;
  country: string;
  region: 'Europe' | 'Caribbean' | 'North America' | 'Asia & Beyond';
  price: number;
  formattedPrice: string;
  beds: number;
  baths: number;
  sqFt: number;
  type: 'Cliff Estate' | 'Villa' | 'Alpine Chalet' | 'Penthouse' | 'Waterfront';
  image: string;
  additionalImages?: string[];
  isFeatured?: boolean;
  isOffMarket?: boolean;
  status: 'FOR SALE' | 'OFF-MARKET' | 'UNDER CONTRACT' | 'JUST SOLD';
  description: string;
  features: string[];
  agentId: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  region: string;
  photo: string;
  phone: string;
  email: string;
  languages: string[];
  experienceYears: number;
  totalVolume: string;
  recentNotableSale: string;
  bio: string;
  specialty: string;
}

export interface Destination {
  id: string;
  name: string;
  subtitle: string;
  propertiesCount: number;
  image: string;
  tagline: string;
}

export interface JournalArticle {
  id: string;
  title: string;
  category: 'MARKET TRENDS' | 'DESTINATION GUIDE' | 'BUYER TIPS' | 'ARCHITECTURE';
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string;
}

export type Currency = 'USD' | 'EUR' | 'GBP' | 'CHF' | 'AED';
