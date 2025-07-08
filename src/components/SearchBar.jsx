import React from "react";

export default function SearchBar({setImput, setPictureTitle, setBtnPress}) {
  return (
    <div className="flex items-center justify-between mb-10 px-4 pt-2 gap-3">
      <input
        type="text"
        placeholder="Type an image to search..."
        className="h-12 px-5 rounded-md shadow border border-slate-300 text-sm text-slate-800"
        onChange={(e) => {
          setImput(e.target.value), setPictureTitle(e.target.value)
        }}
      />
      <button
        onClick={() => setBtnPress(true)}
        className="h-12 px-5 rounded-md shadow bg-gradient-to-r from-fuchsia-700 to-violet-700 text-white font-bold hover:from-violet-600 hover:to-blue-700 transform transition-colors duration-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </div>
  );
}
