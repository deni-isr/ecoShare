export type ProductStatus = 'repair' | 'donate' | 'sell';

export interface Product {
  id: string | number;
  title: string;
  category?: string;
  description: string;
  location: string;
  item_condition?: string;
  status: ProductStatus;
  price?: string | null;
  contact_phone?: string;
  created_at?: string;
  time?: string;
  images?: string[];
  user_id?: number;
}