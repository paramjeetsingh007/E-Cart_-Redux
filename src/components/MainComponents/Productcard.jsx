import React, { useEffect, useState } from "react";
import Product from "../../api/ProductApi";
import { useDispatch, useSelector } from "react-redux";
import { addTocart , addToast } from "../../redux/features/CartSlice";

function Productcard() {
  const [products,setProducts] = useState([])
  const dispatch= useDispatch()

  const query=useSelector((state)=>state.cart.query)

const filteredProducts = products.filter((item) =>
  item.title.toLowerCase().includes(query.toLowerCase())
);
  useEffect(() => {
    async function fetchProducts() {
      const data = await Product();
      console.log(data);
      setProducts(data)
    }
    fetchProducts();  
  }, []);

  function Additem(item){
    dispatch(addTocart(item))
    dispatch(addToast())

  }

  return (
  <div className="flex flex-wrap justify-center gap-6 p-4">
    {filteredProducts.map((item) => (
      
      <div
        key={item.id}
        className="w-72 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
      >
        {/* Image */}
        <div className="h-56 p-6 bg-gray-50 flex items-center justify-center">
          <img
            src={item.image}
            alt={item.title}
            className="h-full object-contain"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs font-semibold text-[var(--secondary)] uppercase">
            {item.category}
          </p>

          <h2 className="mt-2 text-base font-semibold text-gray-800 line-clamp-2 min-h-[48px]">
            {item.title}
          </h2>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-yellow-500">
              ★ {item.rating.rate}
            </span>
            <span className="text-gray-400 text-sm">
              ({item.rating.count})
            </span>
          </div>

          <div className="mt-3">
            <span className="text-2xl font-bold text-[var(--background)]">
              ₹ {Math.round(item.price * 85)}
            </span>
          </div>

          <div className="mt-4 flex gap-2">
            <button className="flex-1 bg-[var(--secondary)] text-white py-2 rounded-lg" onClick={()=>Additem(item)}>
              Add Cart
            </button>

            <button className="flex-1 border border-[var(--secondary)] text-[var(--secondary)] py-2 rounded-lg hover:bg-[var(--secondary)] hover:text-white">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
);
}

export default Productcard;
