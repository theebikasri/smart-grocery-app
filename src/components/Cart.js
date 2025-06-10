
const Cart = ({ cartItems, onDeleteItem }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-white p-4 rounded shadow-md max-w-md mx-auto mt-6 text-black">
      <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center border p-2 rounded"
              >
                <span>{item.name} - ₹{item.price}</span>
                <button
                  onClick={() => onDeleteItem(index)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-right font-bold">
            Total: ₹{total.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;