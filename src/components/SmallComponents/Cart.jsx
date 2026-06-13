import React from "react";
import {  ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Cart() {
  const count = useSelector((state) => state.cart.count);

  return (
    <div className="relative w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200">
   <Link to='/my-cart'>
    {/* Cart Icon */}
      <ShoppingCart className="w-6 h-6" />

      {/* Badge */}
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-md">
          {count}
        </span>
      )}
   </Link>
     

    </div>
  );
}

export default Cart;