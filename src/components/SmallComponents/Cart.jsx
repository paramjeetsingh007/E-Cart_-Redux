import React from "react";
import { ShoppingCart } from "lucide-react";

function Cart() {
  return (
    <div className="w-15 h-15 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm font-bold relative cursor-pointer mr-4">
      <ShoppingCart className="w-8 h-8" />
      <span className="absolute right-1 top-2  text-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
        0
      </span>
    </div>
  );
}

export default Cart;
