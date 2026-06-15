import React, { useState } from "react";
import Logo from "../SmallComponents/Logo";
import Searchbar from "../SmallComponents/Searchbar";
import Cart from "../SmallComponents/Cart";
import { Search, X } from "lucide-react";

function Header() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header
      className="w-full sticky top-0 z-50"
      style={{
        background:
          "linear-gradient(135deg, var(--background) 0%, #6d28d9 100%)",
        boxShadow: "0 4px 24px rgba(109,40,217,0.18)",
      }}
    >
      {/* Main bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Searchbar — desktop only */}
        {/* Searchbar — desktop only */}
        <div className="hidden sm:flex flex-1 max-w-xl mx-6">
          <div className="w-full bg-white/15 backdrop-blur-sm rounded-2xl border border-white/20 px-4 py-2.5 flex items-center gap-3 hover:bg-white/20 transition-all">
            <Search size={16} className="text-white/70 flex-shrink-0" />{" "}
            {/* Sirf yahaan ek icon */}
            <div className="flex-1">
              <Searchbar />
            </div>
          </div>
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-3">
          {/* Search icon — mobile only */}
          <button
            className="sm:hidden p-2 rounded-xl bg-white/15 text-white hover:bg-white/25 transition-all"
            onClick={() => setShowSearch(!showSearch)}
          >
            {showSearch ? <X size={20} /> : <Search size={20} />}
          </button>

          {/* Cart */}
          <div className="bg-white/15 hover:bg-white/25 transition-all rounded-xl px-3 py-2">
            <Cart />
          </div>
        </div>
      </div>

      {/* Mobile search dropdown */}
      {showSearch && (
        <div className="sm:hidden px-4 pb-3">
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl border border-white/20 px-4 py-2 flex items-center gap-2">
            <Search size={16} className="text-white/60 flex-shrink-0" />
            <div className="flex-1">
              <Searchbar />
            </div>
          </div>
        </div>
      )}

      {/* Bottom accent line */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </header>
  );
}

export default Header;
