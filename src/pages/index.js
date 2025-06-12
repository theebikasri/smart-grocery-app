import { useState, useEffect } from 'react';
import Head from 'next/head';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import Link from 'next/link';

export default function Home() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-pink-100 p-4">
      <Head>
        <title>Smart Grocery Shopping Assistant</title>
      </Head>
      <main>
        <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-900 drop-shadow">
          Smart Grocery Shopping Assistant 🧺
        </h1>

        {/* Navigation button to checklist */}
        <div className="text-right mb-6">
          <Link href="/list">
            <button className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-lg shadow">
              Go to Checklist
            </button>
          </Link>
        </div>

        {/* ➕ Button to go to OpenFood search page */}
        <div className="text-right mb-6">
          <Link href="/openfood">
            <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow">
              Search Grocery Items
            </button>
          </Link>
        </div>

        <ProductList onAddToCart={handleAddToCart} />
        <Cart cartItems={cartItems} />
      </main>
    </div>
  );
}