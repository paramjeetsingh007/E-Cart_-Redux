import React from "react";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Cart() {
  const count = useSelector((state) => state.cart.count);

  return (
    <Link to="/my-cart" className="relative flex items-center gap-2 group">

      {/* Icon */}
      <div className="relative">
        <ShoppingCart
          size={24}
          className="text-white group-hover:scale-110 transition-transform duration-200"
          strokeWidth={2}
        />

        {/* Badge */}
        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-[10px] w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center font-extrabold shadow-md leading-none px-0.5">
            {count > 99 ? '99+' : count}
          </span>
        )}
      </div>

      {/* Label — desktop only */}
      <span className="hidden sm:block text-white text-sm font-semibold group-hover:text-yellow-300 transition-colors">
        Cart
      </span>

    </Link>
  );
}

export default Cart;