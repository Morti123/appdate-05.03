export interface FilterProps {
    filterProducts: (filter: string) => void;
    isVisible: boolean;
  }
export type FormValues = {
    name: string;
    email: string;
    phone: string;
    address: string;
    paymentMethod: 'card' | 'cash';
  };
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
  
export interface ProductCardProps {
    product: Product;
    addToCart: (product: Product) => void;
  }
export interface CartItem {
    product: Product;
    quantity: number;
  }
export type FormData = {
    username: string;
    password: string;
  };
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
