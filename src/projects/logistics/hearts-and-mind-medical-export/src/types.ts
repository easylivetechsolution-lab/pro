export interface Product {
  id: string;
  name: string;
  category: 'consumables' | 'ppe' | 'surgical' | 'diagnostics' | 'furniture';
  categoryLabel: string;
  image: string;
  moq: string;
  moqNumber: number;
  packaging: string;
  compliance: string[];
  description: string;
  specs: Record<string, string>;
  leadTime: string;
  inStock: boolean;
  featured?: boolean;
}

export interface RFQItem {
  product: Product;
  quantity: number;
  targetPricePerUnit?: string;
  customPackaging?: string;
  notes?: string;
}

export interface IncotermInfo {
  code: string;
  name: string;
  fullName: string;
  tagline: string;
  freightPayer: 'Seller' | 'Buyer' | 'Shared';
  riskTransfer: string;
  insurancePayer: 'Seller' | 'Buyer' | 'Optional' | string;
  customsExport: 'Seller' | 'Buyer';
  customsImport: 'Seller' | 'Buyer';
  bestFor: string;
  overview: string;
  sellerDuties: string[];
  buyerDuties: string[];
  keyRiskTransferPoint: string;
}

export interface HeroSlide {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
  highlight: string;
  metric: { value: string; label: string };
}

export interface VaultDoc {
  id: string;
  title: string;
  code: string;
  category: 'FDA' | 'CE' | 'ISO' | 'MSDS' | 'Trade';
  date: string;
  fileSize: string;
  issuer: string;
  status: 'Audited' | 'Active' | 'Valid 2026';
  summary: string;
}
