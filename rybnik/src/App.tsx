import React, { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ProductList from './components/ProductList/ProductList';
import {storeProduct } from './components/storeArray/storeArray';
import { Product } from './components/methods/interfaces';
import Filter from './components/Filter/Filter';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './components/Registered/Form';
import Checkout from './components/Pay/Pay'

const App: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(storeProduct);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

 
  const filterProducts = (filter: string) => {
    if (filter === 'All')  {
      setFilteredProducts(storeProduct); 
    } else {
      
      const filtered = storeProduct.filter(product => product.name_prefix === filter);
      setFilteredProducts(filtered);
    }
  };
  const MainPage = () => (
    <>
     <div>
          <Header />
          <Filter filterProducts={filterProducts} />
          <ProductList products={filteredProducts} addToCart={addToCart}> 
          </ProductList>
          <Footer />
        </div>
    </>
  );

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthForm />} />
        <Route path='/appdate-05.03' element={<MainPage/>}/>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<div>404: Страница не найдена</div>} />
      </Routes>
    </Router>
  );
};

export default App;