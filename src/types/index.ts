export type ProductStatus = 'repair' | 'donate' | 'sell';

export interface Product {
  id: string;
  title: string;
  categoryEmoji: string;
  bgGradient: string;
  status: ProductStatus;
  price?: string;
  description: string;
  location: string;
  time: string;
  views?: number;
  images?: string[];
}