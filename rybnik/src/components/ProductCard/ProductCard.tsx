import React from 'react';
import '../../components/styles/global.css'
import './ProductCard.css'

interface Product {
  id: number;
  name_prefix: string;
  full_name: string;
  size: string;
  prices: string;
  images: string;
}

interface ProductCardProps {
  product: Product;
  addToCart: (product: any) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  return (
    <div className="card_style">
      <div className="bi-three-dots"></div>
      <div className="div_style">
        <img src={product.images} alt={product.full_name} className="img_style" />
      </div>
      <h4 className="name_style">{product.full_name}</h4>
      <h5 className="size_style">{product.size}</h5>
      <span className="price_style">{product.prices}</span>
      <button className="butt_style" onClick={() => addToCart(product)}>В корзину</button>
    </div>
  );
};

export default ProductCard;
