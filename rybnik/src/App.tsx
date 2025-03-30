import React, { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ProductList from './components/ProductList/ProductList';
import { Product, storeProduct } from './components/storeArray/storeArray';
import Filter from './components/Filter/Filter';

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

  return (
    <div>
      <Header />
      <Filter filterProducts={filterProducts} />
      <ProductList products={filteredProducts} addToCart={addToCart}> 
      </ProductList>
      <Footer />
    </div>
  );
};

export default App;