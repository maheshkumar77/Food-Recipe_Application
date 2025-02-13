import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { LuLoader } from "react-icons/lu";
import { FiLink } from "react-icons/fi";

// Type for the meal data
interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const Indianfood: React.FC = () => {
  const [error, setError] = useState<string | null>(null); // For handling error, string or null
  const [meals, setMeals] = useState<Meal[]>([]); // State for meals, typed as an array of Meal
  const [loading, setLoading] = useState<boolean>(true); // State for loading, typed as boolean

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian');
        setMeals(response.data.meals); // Update the state with the fetched meals data
        setLoading(false); // Set loading to false when data is fetched
      } catch (err) {
        setError("Error fetching data"); // Handle any error during the fetch
        setLoading(false); // Stop the loading spinner even if there's an error
      }
    };

    fetch();
  }, []); // Empty dependency array means this will only run once after the initial render

  if (loading) {
    return <div className="text-center text-8xl w-full flex justify-center items-center"><LuLoader className='animate-spin' /></div>;
  }

  if (error) {
    return <h1 className="text-center text-xl text-red-600">{error}</h1>;
  }

  // Render the fetched data
  return (
    <div className='lg:container w-full h-full px-2 mx-auto'>
      <h1 className="lg:text-3xl text-xs font-bold text-center mb-6 text-indigo-600 underline">INDIAN FOOD</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {meals.map((meal) => (
          <div
            key={meal.idMeal}
            className="bg-indigo-600 text-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{meal.strMeal}</h2>
              <Link
                to={`/meals/${meal.idMeal}`} // Use the idMeal for dynamic routing
                className="mt-2 text-indigo-200 hover:text-white flex"
              >
               <FiLink className='animate-bounce'/> View Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Indianfood;
