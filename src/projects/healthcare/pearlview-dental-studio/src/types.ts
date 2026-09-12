export interface ServiceItem {
  id: string;
  title: string;
  category?: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  iconName: string;
  timeline: string;
  recovery: string;
  pricing: string;
  features: string[];
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  experience: string;
  image: string;
  education: string;
  specialty: string;
  philosophy: string;
  signature?: string;
  isFeatured?: boolean;
}

export interface TransformationItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  patientAge: string;
  details: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  initial: string;
  quote: string;
  service: string;
  rating: number;
  date: string;
  verified: boolean;
}

export interface TechItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  comfortBenefit: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'General' | 'Cosmetic' | 'Insurance' | 'Appointments';
}
