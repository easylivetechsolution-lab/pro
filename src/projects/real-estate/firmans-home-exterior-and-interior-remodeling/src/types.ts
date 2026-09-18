export interface ServiceItem {
  id: string;
  title: string;
  category: 'exterior' | 'interior' | 'outdoor';
  tagline: string;
  description: string;
  image: string;
  iconName: string;
  features: string[];
  materials?: string[];
  warranty?: string;
  priceRange?: string;
}

export interface GalleryProject {
  id: string;
  title: string;
  category: string;
  tags: string[];
  beforeImage: string;
  afterImage: string;
  description: string;
  duration: string;
  scope: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  quote: string;
  avatar: string;
  projectType: string;
}

export interface Hotspot {
  id: string;
  title: string;
  category: string;
  x: number; // percentage
  y: number; // percentage
  description: string;
  features: string[];
  image: string;
}
