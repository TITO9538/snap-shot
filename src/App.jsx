import React, { useState, useEffect } from "react";
import { Render } from "./components/render";
import SearchBar from "./components/SearchBar";
import axios from "axios";

export default function App() {
  const [input, setImput] = useState("");
  const [imageUrl, setImageUrl] = useState([]);
  const [btnPress, setBtnPress] = useState(false);
  const [pictureTitle, setPictureTitle] = useState("Mountain");

  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await axios.get(
          `https://api.pexels.com/v1/search?query=mountains&per_page=10`,
          {
            headers: {
              Authorization: "49tsFh8le0uK8qKoEeJIoYCr60WO4AllXnJbL1OfntjiLKboBuNuInfS",
            },
          }
        );
        console.log(response.data.photos);
        if (response.data.photos && response.data.photos.length > 0) {
          setImageUrl(response.data.photos.map((photo) => photo.src.large));
        } else {
          setImageUrl([]);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchImage();
  }, []);

  useEffect(() => {
    if (!input || !btnPress) return;

    async function fetchImage(url) {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(url)}&per_page=40`,
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
    fetchImage(input);
  }, [btnPress]);

  return (
    <div className="h-screen w-full bg-white">
      <Render></Render>
      <div className="flex flex-col items-center justify-center p-4 md:mx-20">
        <SearchBar
          setImput={setImput}
          setPictureTitle={setPictureTitle}
          setBtnPress={setBtnPress}
        />
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
