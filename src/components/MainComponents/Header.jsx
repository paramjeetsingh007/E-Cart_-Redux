import React from "react";
import Logo from "../SmallComponents/Logo";
import Searchbar from "../SmallComponents/Searchbar";
import Cart from "../SmallComponents/Cart";

function Header() {
  return (
    <header className="w-full bg-[var(--background)] px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center justify-between">
          <Logo />
          <div className="sm:hidden">
            <Cart />
          </div>
        </div>

        <div className="w-full sm:flex-1 sm:px-6">
          <Searchbar />
        </div>

        <div className="hidden sm:block">
          <Cart />
        </div>

      </div>
    </header>
  );
}

export default Header;