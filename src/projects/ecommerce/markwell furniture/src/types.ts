export interface Product {
  id: string;
  name: string;
  category: 'desks' | 'chairs' | 'conference' | 'storage' | 'workstations' | 'handcrafted';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  secondaryImage?: string;
  images?: string[];
  isSale?: boolean;
  isBestSeller?: boolean;
  tag?: string;
  description: string;
  features: string[];
  dimensions?: string;
  materials?: string[];
  colors?: { name: string; hex: string; image?: string }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface BlogPost {
  id: string;
  title: string;
  snippet: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

export interface ErgonomicFeature {
  id: string;
  title: string;
  description: string;
  top: string; // percentage
  left: string; // percentage
}
