"use client";
import { useState } from "react";
import Link from "next/link";

export default function OpenFoodPage() {
  const [query, setQuery] = useState("");
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  const fetchProduct = async () => {
    setError("");
    setProduct(null);

    if (!query.trim()) {
      setError("Please enter a product name.");
      return;
    }

    try {
      const res = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1`
      );
      const data = await res.json();

      if (data.products && data.products.length > 0) {
        setProduct(data.products[0]);
      } else {
        setError("No product found.");
      }
    } catch (err) {
      setError("Failed to fetch product.");
      console.error(err);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    const existing = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updated = [
      ...existing,
      {
        name: product.product_name,
        brand: product.brands,
        image: product.image_front_small_url,
      },
    ];
    localStorage.setItem("cartItems", JSON.stringify(updated));
    alert("✅ Item added to cart!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-pink-100 p-6 font-sans">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">🧺 Smart Grocery Search</h2>

        <input
          type="text"
          placeholder="Enter grocery item..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-3 w-2/3 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        <button
          onClick={fetchProduct}
          className="ml-3 px-5 py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700"
        >
          Search
        </button>

        <div className="mt-5 text-right">
          <Link href="/">
            <button className="text-sm text-blue-600 underline hover:text-blue-800">
              ← Go to Home Page
            </button>
          </Link>
        </div>

        {error && <p className="text-red-600 mt-4">{error}</p>}

        {product && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md text-black">
            <h3 className="text-2xl font-bold mb-2">{product.product_name}</h3>
            {product.image_front_small_url && (
              <img
                src={product.image_front_small_url}
                alt={product.product_name}
                className="mx-auto mb-4 rounded-lg shadow-md max-w-[200px]"
              />
            )}
            <p><strong>Brand:</strong> {product.brands}</p>
            <p><strong>Category:</strong> {product.categories}</p>
            <p><strong>Nutrition Score:</strong> {product.nutrition_grades}</p>

            <button
              onClick={handleAddToCart}
              className="mt-5 px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}