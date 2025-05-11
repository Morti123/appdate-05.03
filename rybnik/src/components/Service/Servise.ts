
import { Product } from '../storeArray/storeArray';
import { storeProduct } from '../storeArray/storeArray';

export const loadProductsFromDB = async (): Promise<Product[]> => {
  try {
    const response = await fetch('/api/products');
    const data = await response.json();
    
    return data.map((dbProduct: any) => ({
      id: dbProduct.id,
      name_prefix: dbProduct.name_prefix,
      full_name: dbProduct.full_name,
      size: dbProduct.size,
      degree: dbProduct.degree,
      pH: dbProduct.pH,
      GH: dbProduct.GH,
      keeping_fish: dbProduct.keeping_fish,
      images: dbProduct.images,
      prices: dbProduct.prices
    }));
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
};

export const initializeStoreProducts = async () => {
  const products = await loadProductsFromDB();
  storeProduct = products;
};

export const getProductById = (id: number): Product | undefined => {
  return storeProduct.find(product => product.id === id);
};

export const searchProducts = (query: string): Product[] => {
  return storeProduct.filter(product => 
    product.name_prefix.toLowerCase().includes(query.toLowerCase()) ||
    product.full_name.toLowerCase().includes(query.toLowerCase())
  );
};