import React, { useState, useEffect, ChangeEvent } from "react";
import { IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom"; // Import Link for navigation
import Indianfood from "./Indianfood";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdFoodBank } from "react-icons/md";
import Footer from "./Footer";

const Hero: React.FC = () => {
  // Array of images
  const images: string[] = [
    "https://plus.unsplash.com/premium_photo-1683892034683-b6896f6245f9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1661081090290-9b66fd49d882?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1581597096506-acefe678d02b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1683619761464-6b7c9a2716a8?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  // State to keep track of the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [data, setData] = useState<string>(""); // State to hold search input

  // Use useEffect to switch images every 3 seconds (3000ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    // Cleanup interval when the component unmounts or changes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center flex-col h-auto">
      <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] flex flex-col overflow-hidden">
        {/* Image Slider */}
        <div className="absolute inset-0">
          <img
            src={images[currentImageIndex]} // Use the current image
            alt="Slider Image"
            className="object-cover w-full h-full opacity-80" // Ensures image covers the full container
          />
        </div>

        {/* Heading */}
        <h1 className="absolute flex justify-center text-2xl sm:text-4xl lg:text-5xl font-serif text-blue-500 opacity-100 text-center z-10 w-full mt-[15%]">
          <IoFastFoodOutline className="animate-bounce" />START COOKING{" "}
          <MdFoodBank className="animate-bounce" />
        </h1>
      </div>

      {/* Search Box */}
      <div className="w-full flex justify-center mt-8 mb-8">
        <div className="flex items-center space-x-4 w-[80%] sm:w-[60%] md:w-[40%]">
          <input
            type="text"
            value={data} // Bind input value to state
            onChange={(e: ChangeEvent<HTMLInputElement>) => setData(e.target.value)} // Update state with input value
            className="py-2 px-4 rounded-l-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
            placeholder="Search..."
          />
          <Link to={`meal/${data}`}>
            <button className="bg-green-500 text-white p-2 rounded-r-md hover:bg-green-700 transition-colors">
              <IoMdSearch />
            </button>
          </Link>
        </div>
      </div>

      {/* Content Below the Image Slider */}
      <div className="w-full bg-slate-400 ">
        <Indianfood />
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Hero;
