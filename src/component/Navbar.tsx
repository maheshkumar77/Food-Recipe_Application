import { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import img from "./cooking.png";

// Define the Navbar component
const Navbar = () => {
  // State to manage the mobile menu toggle (boolean)
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="bg-slate-500 p-2">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Name */}
        <Link to="/" className="text-white text-lg font-semibold">
          <img src={img} className="max-h-9 max-w-12 animate-bounce bg-transparent" />
        </Link>

        {/* Hamburger Menu for mobile */}
        <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none md:hidden">
          {/* Hamburger Icon and Close Icon */}
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        {/* Navigation Links */}
        <div
          className={`w-full md:flex md:items-center md:w-auto 
            md:space-x-4 absolute md:relative top-16 left-0 md:top-0 
            md:left-0 p-4 md:p-0 bg-transparent md:bg-transparent 
            transition-all duration-500 ease-in-out transform ${isOpen ? 
            'translate-x-0' : 'translate-x-full'
            } md:translate-x-0`}
        >
          <Link
            to="/"  // Home route
            className="block py-2 px-4 text-white hover:text-gray-200 md:inline-block font-medium"
          >
            Home
          </Link>

          <Link
            to="/cuisdetail"  // Cuisine Detail route
            className="block py-2 px-4 text-white hover:text-gray-200 md:inline-block font-medium"
          >
            Cuisine Detail
          </Link>

          <Link
            to="/ingredients"  // Ingredients route
            className="block py-2 px-4 text-white hover:text-gray-200 md:inline-block font-medium"
          >
            Ingredients
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
