import React from 'react';

const Cart = ({ cartItems }) => {
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="p-4 border rounded shadow-md bg-white max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-3">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item, idx) => (
            <li key={idx}>
              {item.name} - ₹{item.price}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-3 font-semibold">Total: ₹{totalPrice}</p>
    </div>
  );
};

export default Cart;