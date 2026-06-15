import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod, goToStep } from "../../redux/features/orderSlice";

const paymentOptions = [
  { id: 'cod', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when order arrives' },
  { id: 'upi', label: 'UPI', icon: '📱', desc: 'GPay, PhonePe, Paytm' },
  { id: 'card', label: 'Credit / Debit Card', icon: '💳', desc: 'Visa, Mastercard, RuPay' },
];

function PaymentMethod() {
  const dispatch = useDispatch();
  const { address } = useSelector((state) => state.order);
  const { items } = useSelector((state) => state.cart);
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');

  // UPI fields
  const [upiId, setUpiId] = useState('');
  const [upiError, setUpiError] = useState('');

  // Card fields
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [cardErrors, setCardErrors] = useState({});

// Yeh line change karo — quantity || 1 add karo
const totalAmount = items.reduce(
  (acc, item) => acc + Math.round(item.price * 85) * (item.quantity || 1), 0
);

  // Format card number with spaces
  const formatCardNumber = (val) =>
    val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

  // Format expiry MM/YY
  const formatExpiry = (val) => {
    const clean = val.replace(/\D/g, '').slice(0, 4);
    return clean.length >= 3 ? clean.slice(0, 2) + '/' + clean.slice(2) : clean;
  };

  const validateAndSubmit = () => {
    if (!selected) { setError('Please select a payment method'); return; }

    if (selected === 'upi') {
      if (!/^[\w.-]+@[\w]+$/.test(upiId)) {
        setUpiError('Enter a valid UPI ID (e.g. name@gpay)');
        return;
      }
    }

    if (selected === 'card') {
      const errs = {};
      if (card.number.replace(/\s/g, '').length !== 16) errs.number = 'Enter valid 16-digit card number';
      if (!card.name.trim()) errs.name = 'Enter cardholder name';
      if (!/^\d{2}\/\d{2}$/.test(card.expiry)) errs.expiry = 'Enter valid expiry (MM/YY)';
      if (card.cvv.length !== 3) errs.cvv = 'Enter valid 3-digit CVV';
      if (Object.keys(errs).length > 0) { setCardErrors(errs); return; }
    }

    dispatch(savePaymentMethod({ method: selected, totalAmount })); // ✅ totalAmount bhi bhejo
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-5 text-gray-800">💳 Payment Method</h2>

      {/* Address summary */}
      <div className="bg-gray-50 rounded-xl p-4 mb-5 text-sm text-gray-600">
        <p className="font-semibold text-gray-800 mb-1">📍 Delivering to:</p>
        <p>{address?.name} • {address?.phone}</p>
        <p>{address?.address}, {address?.city}, {address?.state} - {address?.pincode}</p>
        <button onClick={() => dispatch(goToStep(1))} className="text-[var(--secondary)] text-xs mt-1 underline">
          Change Address
        </button>
      </div>

      {/* Payment options */}
      <div className="flex flex-col gap-3 mb-2">
        {paymentOptions.map((option) => (
          <div key={option.id}>
            <div
              onClick={() => { setSelected(option.id); setError(''); setUpiError(''); setCardErrors({}); }}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selected === option.id ? 'border-[var(--secondary)] bg-purple-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-2xl">{option.icon}</span>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{option.label}</p>
                <p className="text-xs text-gray-500">{option.desc}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selected === option.id ? 'border-[var(--secondary)]' : 'border-gray-300'
              }`}>
                {selected === option.id && <div className="w-3 h-3 rounded-full bg-[var(--secondary)]" />}
              </div>
            </div>

            {/* UPI Input */}
            {selected === 'upi' && option.id === 'upi' && (
              <div className="mt-2 px-1">
                <input
                  type="text"
                  placeholder="Enter UPI ID (e.g. name@gpay)"
                  value={upiId}
                  onChange={(e) => { setUpiId(e.target.value); setUpiError(''); }}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--secondary)] ${
                    upiError ? 'border-red-400' : 'border-gray-200'
                  }`}
                />
                {upiError && <p className="text-red-500 text-xs mt-1">{upiError}</p>}
              </div>
            )}

            {/* Card Inputs */}
            {selected === 'card' && option.id === 'card' && (
              <div className="mt-3 px-1 flex flex-col gap-3">
                <div>
                  <input
                    type="text"
                    placeholder="Card Number (1234 5678 9012 3456)"
                    value={card.number}
                    onChange={(e) => setCard({ ...card, number: formatCardNumber(e.target.value) })}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--secondary)] ${cardErrors.number ? 'border-red-400' : 'border-gray-200'}`}
                  />
                  {cardErrors.number && <p className="text-red-500 text-xs mt-1">{cardErrors.number}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    value={card.name}
                    onChange={(e) => setCard({ ...card, name: e.target.value })}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--secondary)] ${cardErrors.name ? 'border-red-400' : 'border-gray-200'}`}
                  />
                  {cardErrors.name && <p className="text-red-500 text-xs mt-1">{cardErrors.name}</p>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Expiry (MM/YY)"
                      value={card.expiry}
                      onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                      className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--secondary)] ${cardErrors.expiry ? 'border-red-400' : 'border-gray-200'}`}
                    />
                    {cardErrors.expiry && <p className="text-red-500 text-xs mt-1">{cardErrors.expiry}</p>}
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="CVV"
                      maxLength={3}
                      value={card.cvv}
                      onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, '') })}
                      className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--secondary)] ${cardErrors.cvv ? 'border-red-400' : 'border-gray-200'}`}
                    />
                    {cardErrors.cvv && <p className="text-red-500 text-xs mt-1">{cardErrors.cvv}</p>}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {/* Total */}
      <div className="flex justify-between font-bold text-lg border-t pt-4 mb-5 mt-4">
        <span>Total Amount</span>
        <span className="text-[var(--secondary)]">₹ {totalAmount.toLocaleString()}</span>
      </div>

      <button
        onClick={validateAndSubmit}
        className="w-full bg-[var(--secondary)] text-white py-3 rounded-xl font-semibold hover:opacity-90"
      >
        Place Order 🛒
      </button>
    </div>
  );
}

export default PaymentMethod;