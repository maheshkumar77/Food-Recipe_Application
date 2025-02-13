import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { LuLoader } from "react-icons/lu";
import { GiWorld } from "react-icons/gi";
import Footer from "../component/Footer";

// Define a type for the area object
interface Area {
  strCategory: string;
}

export default function CuisineList() {
  const [areas, setAreas] = useState<Area[]>([]); // Type areas state
  const [loading, setLoading] = useState<boolean>(true); // Type loading state
  const [error, setError] = useState<string | null>(null); // Type error state
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // Type selectedCategory state

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
        setAreas(response.data.meals);
        setLoading(false);
      } catch (err) {
        setError("Error loading data");
        setLoading(false);
      }
    };

    fetchAreas();
  }, []);

  // Handling category click to set selectedCategory
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return <div className="text-center text-8xl w-full flex justify-center items-center"><LuLoader className="animate-spin" /></div>;
  }

  if (error) {
    return <h1 className="text-center text-xl text-red-600">{error}</h1>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl lg:text-4xl font-bold text-center mb-6 text-white underline flex justify-center">
        <GiWorld className="animate-spin mr-4" />
        CUISINES FROM AROUND THE WORLD
        <GiWorld className="animate-spin ml-4" />
      </h1>

      {/* Grid layout for displaying areas */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {areas.map((area, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(area.strCategory)} // Set category on click
            className="flex justify-center items-center bg-indigo-600 text-white p-6 rounded-lg shadow-lg hover:bg-indigo-800 transition duration-300 cursor-pointer"
          >
            <Link to={`/pork?category=${area.strCategory}`}> {/* Pass category through query param */}
              <p className="text-xl font-semibold">{area.strCategory}</p>
            </Link>
          </div>
        ))}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
