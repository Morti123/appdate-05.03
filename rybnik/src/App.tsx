import React, { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ProductList from './components/ProductList/ProductList';
import { Product } from './components/types/types';
import { Filter } from '@mui/icons-material';



const App: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  return (
    <div>
      <Header />
      <Filter/>
      <ProductList addToCart={addToCart} />
      <Footer />
    </div>
  );
};

export default App;