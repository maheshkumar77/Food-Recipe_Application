import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { LuLoader } from "react-icons/lu";
import { GiStrawberry } from "react-icons/gi";
import { BsCupStraw } from "react-icons/bs";

// Define a type for the ingredient object
interface Ingredient {
  idIngredient: string;
  strIngredient: string;
}

export default function IngredientsList() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]); // Type ingredients state
  const [loading, setLoading] = useState<boolean>(true); // Type loading state
  const [error, setError] = useState<string | null>(null); // Type error state

  // Fetch ingredients list on component mount
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
        );
        setIngredients(response.data.meals); // Assuming meals is the correct key
        setLoading(false);
      } catch (err) {
        setError("Error loading ingredients");
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []); // Empty dependency array ensures it only runs once after the initial render

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

  return (
    <div className="container h-auto mx-auto p-6">
      <h1 className="text-xl lg:text-4xl font-bold text-center mb-6 text-white underline flex justify-center">
        <GiStrawberry className="animate-ping mr-4" />
        INGREDIENTS LIST
        <BsCupStraw className="animate-ping ml-4" />
      </h1>

      {/* Grid layout for displaying ingredients */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient.idIngredient}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300 cursor-pointer"
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold">{ingredient.strIngredient}</h2>
              <Link
                to={`/mealsa/${ingredient.strIngredient}`}
                className="text-center text-white underline mt-2"
              >
                See Meals
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
