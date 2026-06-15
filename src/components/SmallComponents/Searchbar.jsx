import React, { useState } from "react";
import { X } from "lucide-react"; // Search icon hatao
import { addQuery } from '../../redux/features/CartSlice';
import { useDispatch } from "react-redux";

function Searchbar() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addQuery(text));
  }

  const handleClear = () => {
    setText('');
    dispatch(addQuery(''));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex items-center gap-2">

      {/* Input only — no search icon inside */}
      <input
        type="text"
        placeholder="Search products..."
        className="flex-1 bg-transparent outline-none text-sm text-white placeholder-white/50 min-w-0"
        onChange={(e) => {
          setText(e.target.value);
          dispatch(addQuery(e.target.value));
        }}
        value={text}
      />

      {/* Clear button */}
      {text && (
        <button type="button" onClick={handleClear}>
          <X size={14} className="text-white/60 hover:text-white transition-colors" />
        </button>
      )}

      {/* Search button */}
      <button
        type="submit"
        className="flex-shrink-0 bg-white text-purple-700 font-semibold text-sm px-4 py-2 rounded-xl hover:bg-purple-50 transition-all shadow"
      >
        Search
      </button>

    </form>
  );
}

export default Searchbar;