import React, { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ProductList from './components/ProductList/ProductList';
import Slider from './components/Slider/Slider';
import { Product } from './components/storeArray/storeArray';


const App: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  return (
    <div>
      <Header />
      <Slider />
      <ProductList addToCart={addToCart} />
      <Footer />
    </div>
  );
};

export default App;