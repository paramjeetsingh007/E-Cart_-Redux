import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder, resetOrder } from "../../redux/features/orderSlice";
import { clearCart } from "../../redux/features/CartSlice";
import { useNavigate } from "react-router-dom";

function OrderConfirmation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
// Pehle
const { items } = useSelector((state) => state.cart); // ❌ clearCart ke baad 0 ho jaata

// Ab — yeh karo
const { orderId, address, paymentMethod, totalAmount } = useSelector((state) => state.order); // ✅
console.log(totalAmount);

// items wali line hatao, totalAmount calculate karna bhi hatao

  useEffect(() => {
    dispatch(placeOrder());
    dispatch(clearCart());
  }, []);

  const handleGoHome = () => {
    dispatch(resetOrder());
    navigate('/');
  };

  const paymentLabel = {
    cod: '💵 Cash on Delivery',
    upi: '📱 UPI',
    card: '💳 Card',
  };

  return (
    <div className="max-w-lg mx-auto mt-10 text-center">
      <div className="bg-white rounded-2xl shadow-md p-8">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-green-600 mb-1">Order Placed!</h2>
        <p className="text-gray-500 mb-6">Your order has been successfully placed.</p>

        {/* Order ID */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-5">
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-bold text-lg text-green-700">{orderId}</p>
        </div>

        {/* Details */}
        <div className="text-left bg-gray-50 rounded-xl p-4 mb-5 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Name</span>
            <span className="font-semibold">{address?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Phone</span>
            <span className="font-semibold">{address?.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Address</span>
            <span className="font-semibold text-right max-w-[60%]">
              {address?.address}, {address?.city}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Payment</span>
            <span className="font-semibold">{paymentLabel[paymentMethod]}</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="text-gray-500 font-bold">Total Paid</span>
            <span className="font-bold text-[var(--secondary)]">
              ₹ {totalAmount?.toLocaleString()} {/* ✅ slice se aayega, 0 nahi hoga */}
            </span>
          </div>
        </div>

        <button
          onClick={handleGoHome}
          className="w-full bg-[var(--secondary)] text-white py-3 rounded-xl font-semibold hover:opacity-90"
        >
          🏠 Go to Home
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmation;