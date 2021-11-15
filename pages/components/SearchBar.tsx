import React from "react";
import Search from "../assets/search.png"

const SearchBar = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
    <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="border-2 border-black rounded-full bg-white shadow flex w-full">
          <img src={Search.src} className="w-12 h-12 px-4 py-4"/>
            <input
                type="text"
                placeholder="Search Startups"
                className="w-full rounded-tl-full rounded-bl-full py-2 px-4" />
            <button className="bg-yellow-300 rounded-tr-full rounded-br-full hover:bg-red-300 py-2 px-4">
                <p className="font-semibold text-base uppercase">Search</p>
            </button>
        </div>
    </div>
</div>
  );
};

export default SearchBar;
