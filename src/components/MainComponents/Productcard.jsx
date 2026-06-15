import React, { useEffect, useState } from "react";
import Product from "../../api/ProductApi";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, addToast } from "../../redux/features/CartSlice";
import { useNavigate } from "react-router-dom";

function Productcard() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useSelector((state) => state.cart.query);

  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    async function fetchProducts() {
      const data = await Product();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  const handleAddToCart = (item) => {
    dispatch(addTocart(item));
    dispatch(addToast());
  };

  const handleBuyNow = (item) => {
    dispatch(addTocart(item));
    navigate("/checkout");
  };

  return (
    <div
      className="min-h-screen w-full py-10 px-4"
      style={{
        background: "linear-gradient(135deg, #f0f4ff 0%, #faf0ff 50%, #fff0f6 100%)",
      }}
    >
      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          🛍️ Explore Products
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Discover the best deals curated just for you
        </p>
        {/* Decorative line */}
        <div className="mt-4 flex justify-center gap-1">
          <div className="h-1 w-10 rounded-full bg-[var(--secondary)]" />
          <div className="h-1 w-4 rounded-full bg-purple-300" />
          <div className="h-1 w-2 rounded-full bg-purple-200" />
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {filteredProducts.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-3xl overflow-hidden flex flex-col"
            style={{
              boxShadow: "0 4px 24px 0 rgba(120,80,200,0.08), 0 1.5px 6px 0 rgba(0,0,0,0.04)",
              transition: "box-shadow 0.3s, transform 0.3s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = "0 16px 48px 0 rgba(120,80,200,0.18), 0 4px 16px 0 rgba(0,0,0,0.08)";
              e.currentTarget.style.transform = "translateY(-6px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = "0 4px 24px 0 rgba(120,80,200,0.08), 0 1.5px 6px 0 rgba(0,0,0,0.04)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* Image Area */}
            <div className="relative h-56 bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
              <img
                src={item.image}
                alt={item.title}
                className="h-full object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
              />

              {/* Rating pill - top right */}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 shadow flex items-center gap-1">
                <span className="text-yellow-400 text-xs">★</span>
                <span className="text-xs font-bold text-gray-700">{item.rating.rate}</span>
              </div>

              {/* Discount badge - top left */}
              <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                23% OFF
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              {/* Category */}
              <span className="self-start text-xs font-semibold text-[var(--secondary)] uppercase tracking-widest bg-purple-50 border border-purple-100 px-2.5 py-0.5 rounded-full">
                {item.category}
              </span>

              {/* Title */}
              <h2 className="mt-2.5 text-sm font-semibold text-gray-800 line-clamp-2 leading-snug flex-1">
                {item.title}
              </h2>

              {/* Stars */}
              <div className="flex items-center gap-0.5 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-sm ${star <= Math.round(item.rating.rate) ? "text-yellow-400" : "text-gray-200"}`}
                  >★</span>
                ))}
                <span className="text-gray-400 text-xs ml-1.5">({item.rating.count} reviews)</span>
              </div>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-xl font-extrabold text-gray-900">
                  ₹{Math.round(item.price * 85).toLocaleString()}
                </span>
                <span className="text-xs text-gray-400 line-through">
                  ₹{Math.round(item.price * 110).toLocaleString()}
                </span>
              </div>

              {/* Divider */}
              <div className="my-4 h-px bg-gray-100" />

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="flex-1 border-2 border-[var(--secondary)] text-[var(--secondary)] py-2 rounded-xl text-xs font-bold hover:bg-[var(--secondary)] hover:text-white transition-all duration-200"
                >
                  🛒 Add to Cart
                </button>
                <button
                  onClick={() => handleBuyNow(item)}
                  className="flex-1 text-white py-2 rounded-xl text-xs font-bold hover:opacity-90 transition-all duration-200"
                  style={{
                    background: "linear-gradient(135deg, var(--secondary), #a855f7)",
                    boxShadow: "0 4px 12px rgba(139,92,246,0.35)",
                  }}
                >
                  ⚡ Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredProducts.length === 0 && products.length > 0 && (
        <div className="text-center py-24">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-700">No products found</h3>
          <p className="text-gray-400 mt-1 text-sm">Try searching with different keywords</p>
        </div>
      )}

      {/* Loading state */}
      {products.length === 0 && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-3xl overflow-hidden animate-pulse">
              <div className="h-56 bg-gray-100" />
              <div className="p-5 flex flex-col gap-3">
                <div className="h-3 bg-gray-100 rounded-full w-1/3" />
                <div className="h-4 bg-gray-100 rounded-full w-full" />
                <div className="h-4 bg-gray-100 rounded-full w-2/3" />
                <div className="h-6 bg-gray-100 rounded-full w-1/2 mt-2" />
                <div className="flex gap-2 mt-2">
                  <div className="h-9 bg-gray-100 rounded-xl flex-1" />
                  <div className="h-9 bg-gray-100 rounded-xl flex-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Productcard;