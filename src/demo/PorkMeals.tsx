import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";  
import { LuLoader } from "react-icons/lu";

// Define a type for the meal object
interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default function PorkMeals() {
  const [meals, setMeals] = useState<Meal[]>([]); // Type meals state
  const [loading, setLoading] = useState<boolean>(true); // Type loading state
  const [error, setError] = useState<string | null>(null); // Type error state
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);  // Type selectedMealId state
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);  // Type selectedMeal state

  const location = useLocation(); // Hook to get the current location
  const category = new URLSearchParams(location.search).get("category");  // Extract the category from query string

  useEffect(() => {
    if (!category) return; // Do nothing if no category is provided

    const fetchMeals = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        setMeals(response.data.meals); // Set meals data
        setLoading(false);
      } catch (err) {
        setError("Error loading data");
        setLoading(false);
      }
    };

    fetchMeals();
  }, [category]); // Fetch meals when category changes

  // Fetch details of the selected meal when the selected meal ID changes
  useEffect(() => {
    if (!selectedMealId) return;

    const fetchMealDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${selectedMealId}`
        );
        setSelectedMeal(response.data.meals[0]); // Set the selected meal data
      } catch (err) {
        console.error("Error fetching meal details", err);
      }
    };

    fetchMealDetails();
  }, [selectedMealId]);

  const handleViewRecipe = (mealId: string) => {
    setSelectedMealId(mealId);  // Set the selected meal ID
  };

  if (loading) {
    return (
      <div className="text-center text-8xl w-full flex justify-center items-center">
        <LuLoader className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return <h1 className="text-center text-xl text-red-600">{error}</h1>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Meals in {category} Cuisine
      </h1>

      {/* Grid layout for displaying meals */}
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
}
