// src/services/productService.ts
import { Product } from '../storeArray/storeArray';
import { storeProduct } from '../storeArray/storeArray';

// Функция для загрузки продуктов из БД
export const loadProductsFromDB = async (): Promise<Product[]> => {
  try {
    const response = await fetch('/api/products');
    const data = await response.json();
    
    // Преобразуем данные из БД в наш формат Product
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

// Функция для инициализации storeProduct
export const initializeStoreProducts = async () => {
  const products = await loadProductsFromDB();
  storeProduct = products;
};

// Получение продукта по ID
export const getProductById = (id: number): Product | undefined => {
  return storeProduct.find(product => product.id === id);
};

// Поиск продуктов
export const searchProducts = (query: string): Product[] => {
  return storeProduct.filter(product => 
    product.name_prefix.toLowerCase().includes(query.toLowerCase()) ||
    product.full_name.toLowerCase().includes(query.toLowerCase())
  );
};