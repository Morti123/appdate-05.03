import React, { useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import Filter from '../Filter/Filter';
import { storeProduct } from '../storeArray/storeArray';
import { Product } from '../storeArray/storeArray';
import '../../components/styles/global.css';
import './ProductList.css';
import Slider from '../Slider/Slider';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';

interface ProductListProps {
  addToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ addToCart }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(storeProduct);
  const [showFilter, setShowFilter] = useState(false);

  const filterProducts = (filter: string) => {
    if (filter === 'All') {
      setFilteredProducts(storeProduct);
    } else {
      const filtered = storeProduct.filter(product => product.name_prefix === filter);
      setFilteredProducts(filtered);
    }
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div className="ocean">
      <div className="popular">
        <div className="popular_container">
          <div className="popular-text" id='ocean'>Наши предложения</div>
          <div className="popular_slider">
            <div className="swiper popular-slider">
              <div className="swiper-wrapper">
                <div className="swiper-text">
                  <div className="pop-text one">Продажа аквариумных рыб</div>
                  <div className="pop-text two">Установка аквариумов</div>
                  <div className="pop-text three">Консультации</div>
                </div>
                {<Slider></Slider>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fil">
        <Filter filterProducts={filterProducts} isVisible={showFilter} />
        <div className="containerFor">
          <DensityMediumIcon className='bi-list' onClick={toggleFilter} />
          <div className="block">
            <SearchIcon className='search'/>
            <input className="field_input" type="text" placeholder="Найти" />
            <ClearIcon className='x-circle'/>
          </div>
          <LocalGroceryStoreIcon className='market'/>
        </div>
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