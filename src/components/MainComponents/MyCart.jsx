import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, ShoppingCart } from "lucide-react";
import { increment, removeFromCart, decrement, clearCart } from "../../redux/features/CartSlice";
import { useNavigate } from 'react-router-dom';

function MyCart() {
  const myItem = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const removeitem = (item) => dispatch(removeFromCart(item));
  const increaseQuantity = (item) => dispatch(increment({ id: item.id }));
  const decreaseQuantity = (item) => dispatch(decrement({ id: item.id }));
  const handleClearCart = () => dispatch(clearCart());

  const totalPrice = myItem.reduce((acc, item) => {
    return acc + Math.round(item.price * 85) * item.quantity;
  }, 0);

  // ✅ Empty Cart UI
  if (myItem.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-4 min-h-[70vh] flex flex-col items-center justify-center">
        <div className="bg-white rounded-3xl shadow-md p-12 flex flex-col items-center gap-5 text-center max-w-md w-full">
          
          {/* Icon */}
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingCart size={44} className="text-gray-300" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
            <p className="text-gray-400 mt-2 text-sm">
              Looks like you haven't added anything yet. Start shopping!
            </p>
          </div>

          <button
            onClick={() => navigate('/')}
            className="mt-2 bg-[var(--secondary)] text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-all"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-[var(--primary)] mb-6">
        My Cart ({myItem.length})
      </h1>

      <div className="flex flex-col gap-4">
        {myItem.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col md:flex-row items-center gap-4 hover:shadow-xl transition-all"
          >
            {/* Product Image */}
            <div className="w-32 h-32 bg-gray-50 rounded-xl flex items-center justify-center p-3">
              <img src={item.image} alt={item.title} className="h-full object-contain" />
            </div>

            {/* Product Info */}
            <div className="flex-1 w-full">
              <p className="text-xs uppercase font-semibold text-[var(--secondary)]">{item.category}</p>
              <h2 className="text-lg font-semibold text-gray-800 mt-1">{item.title}</h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-yellow-500">★ {item.rating.rate}</span>
                <span className="text-gray-400 text-sm">({item.rating.count} Reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="text-center">
              <p className="text-2xl font-bold text-[var(--background)]">
                ₹ {Math.round(item.price * 85)}
              </p>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3">
              <button className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 font-bold" onClick={() => decreaseQuantity(item)}>-</button>
              <span className="font-semibold w-6 text-center">{item.quantity}</span>
              <button className="w-8 h-8 rounded-lg bg-[var(--secondary)] text-white font-bold" onClick={() => increaseQuantity(item)}>+</button>
            </div>

            {/* Remove */}
            <button className="p-3 rounded-xl bg-red-100 text-red-600 hover:bg-red-200" onClick={() => removeitem(item)}>
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold">Price Details</h2>
            <p className="text-gray-500 mt-1">
              Total Items: {myItem.reduce((acc, item) => acc + item.quantity, 0)}
            </p>
            <p className="text-2xl font-bold text-[var(--secondary)] mt-1">
              ₹ {totalPrice.toLocaleString()}
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full sm:w-auto">
            <button
              className="bg-[var(--secondary)] text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>
            <button
              className="border-2 border-red-400 text-red-500 px-6 py-3 rounded-xl font-semibold hover:bg-red-50 transition-all"
              onClick={handleClearCart}
            >
              🗑️ Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCart;