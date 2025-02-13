import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LuLoader } from "react-icons/lu";
import { Link } from "react-router-dom"; 

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const ChickenMeals: React.FC = () => {
  const { ingredient } = useParams<{ ingredient: string }>(); // Type for ingredient from URL params
  const [meals, setMeals] = useState<Meal[]>([]); // Type meals state
  const [loading, setLoading] = useState<boolean>(true); // Type loading state
  const [error, setError] = useState<string | null>(null); // Type error state

  // Fetch data from the API
  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true); // Set loading to true when the request starts
      setError(null); // Reset error state

      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const data = await response.json();

        if (data.meals) {
          setMeals(data.meals); // Store the fetched meals in state
        } else {
          setMeals([]); // No meals found, so set an empty array
        }

        setLoading(false); // Stop loading once the data is fetched
      } catch (err) {
        setError("Error loading meals. Please try again."); // Set error if the fetch fails
        setLoading(false);
      }
    };

    if (ingredient) {
      fetchMeals();
    }
  }, [ingredient]); // Run the effect whenever the `ingredient` changes

  // Render loading state
  if (loading) {
    return (
      <div className="text-center text-8xl w-full flex justify-center items-center">
        <LuLoader className="animate-spin" />
      </div>
    );
  }

  // Render error state
  if (error) {
    return <h1 className="text-center text-2xl text-red-600">{error}</h1>;
  }

  // Render the list of meals if available
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
        Meals with {ingredient}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
                className="mt-2 text-indigo-200 hover:text-white"
              >
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChickenMeals;
