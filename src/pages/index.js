import { useState } from 'react';
import Head from 'next/head';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';

export default function Home() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  return (
    <div className="p-4">
      <Head>
        <title>Smart Grocery Shopping Assistant</title>
      </Head>
      <main>
        <h1 className="text-2xl font-bold text-center mb-4">
          Smart Grocery Shopping Assistant 🧺
        </h1>
        <ProductList onAddToCart={handleAddToCart} />
        <Cart cartItems={cartItems} />
      </main>
    </div>
  );
}