import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ChecklistPage() {
  const [cartItems, setCartItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

  // 🟣 1st useEffect – Load cart items once on first render
  useEffect(() => {
    const stored = localStorage.getItem('cartItems');
    if (stored) {
      const parsed = JSON.parse(stored);
      setCartItems(parsed);
    }
  }, []);

  // 🟣 2nd useEffect – When cartItems change, reset checkedItems
  useEffect(() => {
    setCheckedItems(new Array(cartItems.length).fill(false));
  }, [cartItems]);

  const toggleCheck = (index) => {
    setCheckedItems((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const handleResetChecklist = () => {
    setCheckedItems(new Array(cartItems.length).fill(false));
  };

  const handleClearAll = () => {
    const confirmClear = confirm("Are you sure you want to clear all items?");
    if (confirmClear) {
      localStorage.removeItem('cartItems');
      setCartItems([]);
      setCheckedItems([]);
    }
  };

  const completedCount = checkedItems.filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-pink-200 to-rose-100 flex justify-center items-start p-6">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">📝 Grocery Checklist</h1>

        <div className="flex justify-between mb-4">
          <Link href="/">
            <button className="bg-gray-700 text-white px-4 py-2 rounded-xl">
              ← Back to Home
            </button>
          </Link>

          <div className="space-x-2">
            <button
              onClick={handleResetChecklist}
              className="bg-yellow-500 text-white px-3 py-2 rounded-xl"
            >
              Reset
            </button>
            <button
              onClick={handleClearAll}
              className="bg-red-500 text-white px-3 py-2 rounded-xl"
            >
              Clear All
            </button>
          </div>
        </div>

        <p className="text-lg font-semibold text-gray-800 mb-4">
          ✅ Marked: {completedCount} / {cartItems.length}
        </p>

        <ul className="space-y-3">
          {cartItems.map((item, index) => (
            <li
              key={index}
              className={`p-3 rounded-xl flex items-center justify-between ${
                checkedItems[index]
                  ? 'bg-green-100 text-gray-500 line-through'
                  : 'bg-white text-gray-900 shadow'
              }`}
            >
              <label className="flex items-center gap-2 w-full cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkedItems[index]}
                  onChange={() => toggleCheck(index)}
                />
                {item.name} – ₹{item.price}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}