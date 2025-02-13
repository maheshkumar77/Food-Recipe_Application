import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get route parameters
import axios from "axios";
import { GiCook } from "react-icons/gi";
import { FaMapPin } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import { Link } from "react-router-dom";
import { LuLoader } from "react-icons/lu";
import { FaYoutube } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import Footer from "./Footer";

// Define types for the meal and related meals
interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strInstructions: string;
  strYoutube: string;
  [key: string]: string | undefined; // For ingredients and measures
}

const Fooddetail = () => {
  const { idMeal } = useParams<{ idMeal: string }>(); // Extract meal ID from URL parameters
  const [meal, setMeal] = useState<Meal | null>(null); // State for meal details
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [category, setCategory] = useState<string>(""); // Category as string
  const [relatedMeals, setRelatedMeals] = useState<Meal[]>([]); // Related meals state

  // Fetch meal details based on the idMeal from the URL
  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        // Fetch the meal details
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
        );

        // If the meal has a category, fetch related meals
        if (response.data.meals && response.data.meals.length > 0) {
          const mealData = response.data.meals[0];
          setMeal(mealData); // Set the fetched meal details

          // Set the category from the fetched meal
          const mealCategory = mealData.strCategory;
          setCategory(mealCategory);

          // Fetch related meals based on the category
          const response2 = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealCategory}`
          );

          if (response2.data.meals) {
            setRelatedMeals(response2.data.meals); // Set related meals
          } else {
            setError("No related meals found");
          }
        } else {
          setError("Meal not found");
        }

        setLoading(false);
      } catch (err) {
        setError("Error loading meal details");
        setLoading(false);
      }
    };

    fetchMealDetails();
  }, [idMeal]); // Fetch when idMeal changes

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
    <div className="bg-slate-800 h-auto w-full block">
      <div className="flex justify-center flex-col items-center">
        <div className="h-[70vh] w-[100%]">
          <img
            src={meal?.strMealThumb}
            alt={meal?.strMeal}
            className="h-screen w-full object-cover mt-7 mb-7"
          />
        </div>
        <div className="w-full flex justify-center flex-col text-center text-lg p-4 sm:mt-[-50px] mt-[-95%] rounded bg-slate-800 opacity-70">
          <div className="flex justify-center items-center">
            <IoFastFood className="text-white text-4xl" />
            <h1 className="text-white lg:text-3xl md:text-lg">{meal?.strMeal}</h1>
            <div className=" flex justify-center items-center ">
              <a href={meal?.strYoutube}>
                <FaYoutube className=" animate-pulse text-white lg:text-4xl md:text-lg"/>
              </a>
            </div>
          </div>
          <p className="text-white mt-4 space-x-0 mb-3 first-line:tracking-widest lg:first-letter:text-7xl first-letter:text-3xl first-letter:font-bold lg:text-lg text-xs sm:h[100px] sm:overflow-x-auto text-wrap">
            {meal?.strInstructions}
          </p>
          <div className="text-white mt-4">
            <div className="flex lg:justify-start lg:flex-row flex-col">
              <div className="flex lg:flex-row sm:flex-col justify-center w-full">
                <div className="flex h-[80vh] overflow-x-auto custom-scrollbar w-[35vh] items-center flex-col hover:cursor-progress">
                  <div className="flex">
                    <GiCook className="text-white text-2xl animate-bounce" />
                    <h2 className="text-white text-2xl underline">Ingredients</h2>
                  </div>
                  <div className="flex flex-col gap-2 float-start">
                    {/* Map ingredients and their corresponding measures */}
                    {Array.from({ length: 20 }).map((_, index) => {
                      const ingredientKey = `strIngredient${index + 1}`;
                      const measureKey = `strMeasure${index + 1}`;
                      if (meal && meal[ingredientKey] && meal[measureKey]) {
                        return (
                          <div className="flex gap-1 flex-row w-full" key={ingredientKey}>
                            <FaMapPin className="text-lg text-green-500 animate-pulse" />
                            <p className=" flex w-full ">{meal[ingredientKey]}: {meal[measureKey]} </p>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
                {/* Related Meals Section */}
                <div className="flex flex-col gap-7 w-full items-center border-l-5 border-l-red-500 p-4 h-[80vh] overflow-x-auto custom-scrollbar">
                  <div>
                    <h1 className="lg:text-4xl text-lg items-center underline sticky top-0 bg-slate-800">
                      Related Items
                    </h1>
                  </div>
                  <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
                    {relatedMeals.length > 0 ? (
                      relatedMeals.map((item) => (
                        <div key={item.idMeal} className="lg:h-[250px] lg:w-[250px] h-auto w-auto flex justify-center flex-col overflow-hidden rounded">
                          <img
                            src={item.strMealThumb}
                            alt={item.strMeal}
                            className="lg:h-[250px] lg:w-[250px] object-contain"
                          />
                          <div className="p-4 mt-[-70px] bg-blue-500">
                            <h2 className="text-xl font-semibold">{item.strMeal}</h2>
                            <Link
                              to={`/meals/${item.idMeal}`} // Use the idMeal for dynamic routing
                              className="mt-2 text-indigo-200 hover:text-white flex justify-center gap-2"
                            >
                              <FiExternalLink className=" animate-pulse"/>View Recipe
                            </Link>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-white">No related meals found</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default Fooddetail;
