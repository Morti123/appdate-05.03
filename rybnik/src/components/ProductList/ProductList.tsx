
import React, { useState, useEffect } from 'react';
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
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

export interface CartItem {
  product: Product;
  quantity: number;
}

const CART_STORAGE_KEY = 'aquarium_cart';

const ProductList: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(storeProduct);
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartError, setCartError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          
          if (!Array.isArray(parsedCart)) {
            throw new Error('Invalid cart format');
          }

          const restoredCart = parsedCart
            .map((item: any) => {
              const product = storeProduct.find(p => p.id === item.product?.id);
              return product 
                ? { product, quantity: item.quantity }
                : null;
            })
            .filter((item: CartItem | null): item is CartItem => item !== null);

          setCartItems(restoredCart);
        }
      } catch (error) {
        console.error('Ошибка загрузки корзины:', error);
        setCartError('Не удалось загрузить корзину');
        localStorage.removeItem(CART_STORAGE_KEY);
        setCartItems([]);
      }
    };

    loadCart();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Ошибка сохранения корзины:', error);
      setCartError('Не удалось сохранить корзину');
    }
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === id);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map(item =>
          item.product.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevItems.filter(item => item.product.id !== id);
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const filterProducts = (filter: string) => {
    if (filter === 'All') {
      setFilteredProducts(storeProduct);
    } else {
      const filtered = storeProduct.filter(product => product.name_prefix === filter);
      setFilteredProducts(filtered);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query === '') {
      setFilteredProducts(storeProduct);
    } else {
      const filtered = storeProduct.filter(product => 
        product.full_name.toLowerCase().includes(query) ||
        product.name_prefix.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredProducts(storeProduct);
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (parseFloat(item.product.prices) * item.quantity), 0);
  };

  return (
    <div className="ocean">
      {cartError && (
        <div className="error-notification">
          {cartError}
          <button onClick={() => setCartError(null)}>×</button>
        </div>
      )}

      <div className="popular">
        <div className="popular_container">
          <div className="popular-text" id='ocean'>Наши предложения</div>
          <div className="popular_slider">
            <div className="swiper popular-slider">
              <div className="swiper-wrapper">
                <Slider></Slider>
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
            <input 
              className="field_input" 
              type="text" 
              placeholder="Найти" 
              value={searchQuery}
              onChange={handleSearch}
            />
            {searchQuery && (
              <ClearIcon className='x-circle' onClick={clearSearch} />
            )}
          </div>
          <div className="cart-icon-wrapper">
            <LocalGroceryStoreIcon className='market' onClick={toggleCart}/>
            {cartItems.length > 0 && (
              <span className="cart-badge">{cartItems.length}</span>
            )}
          </div>
        </div>
      </div>

      <div className={`cart-sidebar ${showCart ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Корзина ({cartItems.length})</h3>
          <div>
            {cartItems.length > 0 && (
              <button className="clear-cart-btn" onClick={clearCart}>
                Очистить
              </button>
            )}
            <CloseIcon className="close-cart" onClick={toggleCart} />
          </div>
        </div>
        
        <div className="cart-items">
          {cartItems.length > 0 ? (
            cartItems.map(item => (
              <div key={`${item.product.id}-${item.quantity}`} className="cart-item">
                <img 
                  src={item.product.images} 
                  alt={item.product.full_name} 
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <span className="cart-item-name">{item.product.full_name}</span>
                  <div className="cart-item-controls">
                    <button 
                      className="quantity-btn"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      -
                    </button>
                    <span className="cart-item-quantity">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => addToCart(item.product)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-price">
                    {(parseFloat(item.product.prices) * item.quantity).toFixed(1)} BYN
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-cart">Корзина пуста</div>
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-total">
            Итого: {(calculateTotal()).toFixed(1)} BYN
          </div>
          <button 
            className="checkout-button" 
            disabled={cartItems.length === 0}
            onClick={() => navigate('/checkout', { state: { cartItems } })}
          >
            Оформить заказ
          </button>
        </div>
      </div>

      {showCart && <div className="cart-overlay" onClick={toggleCart}></div>}

      <div className="content">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              addToCart={addToCart} 
            />
          ))
        ) : (
          <div className="no-results">Ничего не найдено</div>
        )}
      </div>
    </div>
  );
};

export default ProductList;