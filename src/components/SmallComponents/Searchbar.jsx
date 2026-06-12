import React from "react";
import { Search } from "lucide-react";

function Searchbar() {
  return (
    <div className="w-full sm:w-1/2 h-11 sm:h-12 bg-white rounded-full">
      <form className="w-full h-full flex items-center px-3 sm:px-4">

        <Search
          className="text-[var(--secondary)] shrink-0"
          strokeWidth={3}
          size={18}
        />

        <input
          type="text"
          placeholder="Search for products..."
          className="flex-1 bg-transparent outline-none text-sm sm:text-lg font-medium text-[var(--primary)] ml-2"
        />

        <button className="ml-2 sm:ml-4 text-white text-sm sm:text-base py-1.5 sm:py-2 px-3 sm:px-4 rounded-xl bg-[var(--secondary)] hover:bg-[var(--primary)] transition duration-300">
          Search
        </button>

      </form>
    </div>
  );
}

export default Searchbar;