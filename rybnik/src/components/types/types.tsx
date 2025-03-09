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
  export interface ProductListProps {
    addToCart: (product: Product) => void;
  }
  export interface FilterProps {
    filterProducts: (filter: string) => void;
  }