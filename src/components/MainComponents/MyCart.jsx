import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2 } from "lucide-react";
import { removeFromCart } from "../../redux/features/CartSlice";

function MyCart() {
  const myItem = useSelector((state) => state.cart.items);

  const dispatch=useDispatch()

  const removeitem=(item)=>{
    dispatch(removeFromCart(item))
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
              <img
                src={item.image}
                alt={item.title}
                className="h-full object-contain"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 w-full">
              <p className="text-xs uppercase font-semibold text-[var(--secondary)]">
                {item.category}
              </p>

              <h2 className="text-lg font-semibold text-gray-800 mt-1">
                {item.title}
              </h2>

              <div className="flex items-center gap-2 mt-2">
                <span className="text-yellow-500">
                  ★ {item.rating.rate}
                </span>

                <span className="text-gray-400 text-sm">
                  ({item.rating.count} Reviews)
                </span>
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
              <button className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300">
                -
              </button>

              <span className="font-semibold">1</span>

              <button className="w-8 h-8 rounded-lg bg-[var(--secondary)] text-white">
                +
              </button>
            </div>

            {/* Remove */}
            <button className="p-3 rounded-xl bg-red-100 text-red-600 hover:bg-red-200" onClick={()=>removeitem(item)}>
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      {myItem.length > 0 && (
        <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">
              Order Summary
            </h2>

            <button className="bg-[var(--secondary)] text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyCart;