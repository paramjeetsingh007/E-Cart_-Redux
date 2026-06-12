import React, { useState } from "react";
import { Search } from "lucide-react";
import {addQuery} from '../../redux/features/CartSlice'
import { useDispatch } from "react-redux";
function Searchbar() {
   const [text,setText]=useState('')
   const dispatch= useDispatch()

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(addQuery(text))

    
    }


  return (
    <div className="w-full sm:w-1/2 h-11 sm:h-12 bg-white rounded-full">
      <form onSubmit={handleSubmit} className="w-full h-full flex items-center px-3 sm:px-4">

        <Search
          className="text-[var(--secondary)] shrink-0"
          strokeWidth={3}
          size={18}
        />

        <input
          type="text"
          placeholder="Search for products..."
          className="flex-1 bg-transparent outline-none text-sm sm:text-lg font-medium text-[var(--primary)] ml-2"
          onChange={(e)=> setText(e.target.value)}
          value={text}
        />

        <button className="ml-2 sm:ml-8 text-white text-sm sm:text-base py-1.5 sm:py-2 px-3 sm:px-4 rounded-xl bg-[var(--secondary)] hover:bg-[var(--primary)] transition duration-300">
          Search
        </button>

      </form>
    </div>
  );
}

export default Searchbar;