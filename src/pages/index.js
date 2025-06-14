import { useState, useEffect } from 'react';
import Head from 'next/head';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import Link from 'next/link';
import ImageUpload from '../components/ImageUpload';

export default function Home() {
  const [cartItems, setCartItems] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]); // change here

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

  const handleUpload = (url) => {
    setUploadedImages((prev) => [...prev, url]); // store all uploaded image URLs
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

        {/* Display Multiple Uploaded Images */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          {uploadedImages.map((img, index) => (
            <div key={index} className="text-center">
              <img
                src={img}
                alt={Uploaded` ${index + 1}`}
                className="w-32 h-32 object-cover rounded-lg mx-auto shadow"
              />
              <p className="text-sm font-semibold text-gray-800 mt-1">
                Uploaded {index + 1}
              </p>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="text-right mb-6">
          <Link href="/list">
            <button className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-lg shadow">
              Go to Checklist
            </button>
          </Link>
        </div>

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
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const [cartItems, setCartItems] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddItem = () => {
    const name = prompt("Enter item name:");
    const price = prompt("Enter item price:");
    if (name && price) {
      setCartItems((prev) => [...prev, { name, price }]);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileURLs = files.map((file) => URL.createObjectURL(file));
    setUploadedImages(fileURLs);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-pink-100 p-4">
      <Head>
        <title>Smart Grocery Shopping Assistant</title>
      </Head>

      <main>
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-900">Smart Grocery Shopping Assistant 🧺</h1>

        <div className="flex justify-end gap-4 mb-4">
          <button onClick={handleAddItem} className="bg-green-600 text-white px-4 py-2 rounded-lg shadow">
            ➕ Add Item
          </button>
          <Link href="/list">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow">
              📝 Go to Checklist
            </button>
          </Link>
        </div>

        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <label className="font-semibold text-gray-700 block mb-2">Upload Item Image:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <div className="flex gap-4 mt-4 flex-wrap">
            {uploadedImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={Uploaded `${index + 1}`}
                className="w-32 h-32 object-cover rounded-lg shadow"
              />
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">🛒 Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-600">No items added yet.</p>
          ) : (
            <ul className="space-y-2">
              {cartItems.map((item, index) => (
                <li key={index} className="flex justify-between bg-gray-100 p-3 rounded-lg">
                  <span>{item.name}</span>
                  <span>₹{item.price}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}