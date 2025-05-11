import data from '../../../db.json';

export interface Product {
  id: number;
  name_prefix: string;
  full_name: string;
  size: string;
  degree: string;
  pH: string;
  GH: string;
  keeping_fish: string;
  images: string;
  prices: string;
}

export const storeProduct: Product[] = data.products;