import React, { useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import Filter from '../Filter/Filter';
import { storeProduct } from '../storeArray/storeArray';
import { Product } from '../storeArray/storeArray';
import '../../components/styles/global.css'
import './ProductList.css'

interface ProductListProps {
  addToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ addToCart }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(storeProduct);

  const filterProducts = (filter: string) => {
    const filtered = storeProduct.filter(product => product.name_prefix === filter);
    setFilteredProducts(filtered);
  };

  return (
    <div className="ocean">
      <div className="popular">
        <div className="popular_container">
          <div className="popular-text">Наши предложения</div>
          <div className="popular_slider">
            <div className="swiper popular-slider">
              <div className="swiper-wrapper">
                <div className="swiper-text">
                  <div className="pop-text one">Продажа аквариумных рыб</div>
                  <div className="pop-text two">Установка аквариумов</div>
                  <div className="pop-text three">Консультации</div>
                </div>
                {/* Слайды */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="i">
        <div className="row">
          <i className="bi-list"></i>
          <div className="block">
            <i className="bi-search"></i>
            <input className="field__input" type="text" placeholder="Найти" />
            <i className="bi-x"></i>
          </div>
          <i className="bi-cart3"></i>
        </div>
        <Filter filterProducts={filterProducts} />
      </div>
      <div className="content">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;