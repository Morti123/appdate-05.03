import React, { useState } from 'react';
import '../../components/styles/global.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import './ProductCard.css';

interface Product {
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

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="card_style">
        <MoreHorizIcon className="bi-three-dots" onClick={toggleModal}></MoreHorizIcon>
        <div className="div_style">
          <img src={product.images} alt={product.full_name} className="img_style" />
        </div>
        <h4 className="name_style">{product.full_name}</h4>
        <h5 className="size_style">{product.size}</h5>
        <span className="price_style">{product.prices}</span>
        <button className="butt_style" onClick={() => addToCart(product)}>В корзину</button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={toggleModal}>×</button>
            <h2 className="modal-title">{product.full_name}</h2>
            <div className="modal-image">  <img src={product.images} alt={product.full_name} className='modal-img-inner'/></div>
            
            <div className="modal-params">
              <h3>Оптимальные параметры воды:</h3>
              <ul>
                <li>Температура: {product.degree}</li>
                <li>Кислотность: {product.pH}</li>
                <li>Жесткость: {product.GH}</li>
              </ul>
            </div>
            
            <div className="modal-description">
              <h3>Оптимальные условия содержания:</h3>
              <p>{product.keeping_fish}</p>
            </div>
            
            <div className="modal-footer">
              <span className="modal-size">Размер: {product.size}</span>
              <span className="modal-price">Цена: {product.prices}</span>
              <button className="modal-add-to-cart" onClick={() => {
                addToCart(product);
                toggleModal();
              }}>
                В корзину
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;