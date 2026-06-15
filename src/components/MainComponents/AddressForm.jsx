import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveAddress } from "../../redux/features/orderSlice";

// ✅ Component ke BAHAR define karo - yahi fix hai input reset ka
const InputField = ({ label, name, placeholder, type = "text", value, onChange, error }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-semibold text-gray-600">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--secondary)] ${
        error ? 'border-red-400' : 'border-gray-200'
      }`}
    />
    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
);

function AddressForm() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    address: '', city: '', pincode: '', state: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!/^[6-9]\d{9}$/.test(form.phone)) newErrors.phone = "Enter a valid phone number";
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Enter a valid email";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!/^\d{6}$/.test(form.pincode)) newErrors.pincode = "Enter a valid 6-digit pincode";
    if (!form.state.trim()) newErrors.state = "State is required";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    dispatch(saveAddress(form));
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-5 text-gray-800">📍 Delivery Address</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="Full Name"        name="name"    placeholder="Rahul Sharma"       value={form.name}    onChange={handleChange} error={errors.name} />
        <InputField label="Phone Number"     name="phone"   placeholder="9876543210" type="tel" value={form.phone}   onChange={handleChange} error={errors.phone} />
        <InputField label="Email"            name="email"   placeholder="rahul@email.com" type="email" value={form.email}   onChange={handleChange} error={errors.email} />
        <InputField label="Pincode"          name="pincode" placeholder="226001"            value={form.pincode} onChange={handleChange} error={errors.pincode} />

        <div className="md:col-span-2">
          <InputField label="Street Address" name="address" placeholder="House No, Street, Area" value={form.address} onChange={handleChange} error={errors.address} />
        </div>

        <InputField label="City"  name="city"  placeholder="Lucknow"       value={form.city}  onChange={handleChange} error={errors.city} />
        <InputField label="State" name="state" placeholder="Uttar Pradesh" value={form.state} onChange={handleChange} error={errors.state} />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-[var(--secondary)] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all"
      >
        Continue to Payment →
      </button>
    </div>
  );
}

export default AddressForm;