import { useState, useEffect } from 'react';
import Head from 'next/head';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import Link from 'next/link';
import ImageUpload from '../components/ImageUpload';

export default function Home() {
  const [cartItems, setCartItems] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  // Load from localStorage on first render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedItems = localStorage.getItem('cartItems');
      const storedImages = localStorage.getItem('uploadedImages');

      if (storedItems) {
        setCartItems(JSON.parse(storedItems));
      }
      if (storedImages) {
        setUploadedImages(JSON.parse(storedImages));
      }
    }
  }, []);

  // Save to localStorage whenever cart or images update
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('uploadedImages', JSON.stringify(uploadedImages));
  }, [cartItems, uploadedImages]);

  const handleAddToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  const handleUpload = (url) => {
    setUploadedImages((prev) => [...prev, url]);
  };

  const handleDelete = (index) => {
    const updated = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(updated);
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

        {/* Upload Section */}
        <div className="mb-6">
          <ImageUpload onUpload={handleUpload} />
        </div>

        {/* Display Uploaded Images */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          {uploadedImages.map((img, index) => (
            <div key={index} className="text-center relative">
              <img
                src={img}
                alt={`Uploaded ${index + 1}`}
                className="w-32 h-32 object-cover rounded-lg mx-auto shadow"
              />
              <button
                onClick={() => handleDelete(index)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full px-2 py-0.5 text-xs shadow hover:bg-red-700"
              >
                🗑
              </button>
              <p className="text-sm font-semibold text-gray-800 mt-1">
                Uploaded {index + 1}
              </p>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end space-x-4 mb-6">
          <Link href="/list">
            <button className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-lg shadow">
              📝 Go to Checklist
            </button>
          </Link>

          <Link href="/openfood">
            <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow">
              🔍 Search Food Items
            </button>
          </Link>
        </div>

        {/* Products and Cart */}
        <ProductList onAddToCart={handleAddToCart} />
        <Cart cartItems={cartItems} />
      </main>
    </div>
  );
}