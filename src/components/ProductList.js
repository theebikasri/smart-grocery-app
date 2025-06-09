import React, { useState } from 'react';

const ProductList = ({onAddToCart})=>{
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = () => {
    if (name && price) {
      const newItem = {
        id: Date.now(), // unique ID
        name,
        price: parseFloat(price),
      };
      setProducts([...products, newItem]);
      setName('');
      setPrice('');
    }
  };

  const handleDelete = (id) => {
    const updatedList = products.filter((item) => item.id !== id);
    setProducts(updatedList);
  };

  const total = products.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-4 border rounded shadow-md bg-white max-w-md mx-auto mt-4">
      <h2 className="text-xl font-bold mb-3">Smart Grocery Assistant</h2>

      <input
        className="border p-2 mb-2 w-full"
        type="text"
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-2 mb-2 w-full"
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleAdd}
      >
        Add Item
      </button>

      <ul className="mt-4">
        {products.map((item) => (
            <li key={item.id} className="border-b py-2 flex justify-between items-center">
  <span>{item.name} - ₹{item.price}</span>
  <div className="flex gap-2">
    <button
      className="bg-green-500 text-white px-2 py-1 rounded"
      onClick={() => onAddToCart(item)}
    >
      Add to Cart
    </button>
    <button
      className="bg-red-500 text-white px-2 py-1 rounded"
      onClick={() => handleDelete(item.id)}
    >
      Delete
    </button>
  </div>
</li>
          
        ))}
      </ul>

      <div className="mt-4 font-bold">
        Total: ₹{total}
      </div>
    </div>
  );
};

export default ProductList;