
import React, { useState } from 'react';

const ProductList = ({ onAddToCart }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  const handleAddClick = () => {
    if (productName.trim() !== '' && productPrice.trim() !== '') {
      const item = {
        name: productName,
        price: parseFloat(productPrice)
      };
      onAddToCart(item);
      setProductName('');
      setProductPrice('');
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-100 to-purple-200 p-4 rounded shadow-md max-w-md mx-auto mt-4">
      <input
        type="text"
        placeholder="Enter product name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        className="border w-full p-2 mb-2 rounded text-black"
      />
      <input
        type="number"
        placeholder="Enter price (₹)"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
        className="border w-full p-2 mb-4 rounded text-black"
      />
      <button
        onClick={handleAddClick}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        Add Item
      </button>
    </div>
  );
};

export default ProductList;