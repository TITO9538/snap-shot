import React, { useState, useEffect } from "react";
import { Render } from "./components/render";
import SearchBar from "./components/SearchBar";

export default function App() {
  const [input, setImput] = useState("");
  const [imageUrl, setImageUrl] = useState([]);
  const [btnPress, setBtnPress] = useState(false);
  const [pictureTitle, setPictureTitle] = useState("Mountain");

  useEffect(() => {
    if (!input || !btnPress) return;

    async function fetchImage() {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(input)}&per_page=40`,
        {
          headers: {
            Authorization: "49tsFh8le0uK8qKoEeJIoYCr60WO4AllXnJbL1OfntjiLKboBuNuInfS",
          },
        }
      );

      const data = await response.json();
      if (data.photos && data.photos.length > 0 && btnPress) {
        setImageUrl(data.photos.map((photo) => photo.src.large));
      } else {
        setImageUrl([]);
      }
      setBtnPress(false);
    }

    fetchImage();
  }, [btnPress]);

  return (
    <div className="h-screen w-full bg-white">
      <Render></Render>
      <div className="flex flex-col items-center justify-center p-4 md:mx-20">
        {/* <SearchBar
          setImput={setImput}
          setPictureTitle={setPictureTitle}
          setBtnPress={setBtnPress}
        /> */}
        <div className="flex items-center justify-between mb-10 px-4 pt-2 gap-3">
          <input
            type="text"
            placeholder="Type an image to search..."
            className="h-12 px-5 rounded-md shadow border border-slate-300 text-sm text-slate-800"
            onChange={(e) => {
              setImput(e.target.value), setPictureTitle(e.target.value);
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
        {/* BOTONES DE LAS CATEGORIAS */}
        <div className="flex gap-5 mb-10">
          <button
            onClick={() => {
              setBtnPress(true), setImput("Mountain"), setPictureTitle("Mountain");
            }}
            className="px-4 p-1 text-sm font-bold rounded-sm bg-black text-white">
            Mountain
          </button>
          <button
            onClick={() => {
              setBtnPress(true), setImput("Beaches"), setPictureTitle("Beaches");
            }}
            className="px-4 p-1 text-sm font-bold rounded-sm bg-black text-white">
            Beaches
          </button>
          <button
            onClick={() => {
              setBtnPress(true), setImput("Birds"), setPictureTitle("Birds");
            }}
            className="px-4 p-1 text-sm font-bold rounded-sm bg-black text-white">
            Birds
          </button>
          <button
            onClick={() => {
              setBtnPress(true), setImput("Food"), setPictureTitle("Food");
            }}
            className="px-4 p-1 text-sm font-bold rounded-sm bg-black text-white">
            Food
          </button>
        </div>
        {/* TITULO DE LO BUSCADO */}
        <div className="p-5 pb-10">
          <h3 className="capitalize text-3xl font-sans font-bold">{pictureTitle} Pictures</h3>
        </div>
        {/* IMAGES */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {imageUrl.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Result ${index}`}
              className="rounded-lg shadow-md h-50 w-50 overflow-hidden object-cover transform transition-transform duration-1000 hover:scale-115"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
