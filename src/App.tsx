import {  Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Hero from './component/Hero';
import CuisineList from './demo/CuisineList';
import Fooddetail from './component/Fooddetail';
import PorkMeals from './demo/PorkMeals';
import IngredientsList from "./demo/IngredientsList";
import ChickenMeals from "./demo/ChickenMeals";
import MealDetailPage from './component/MealDetailPage';
// import Footer from './component/Footer';

// Define the App component
const App = () => {
  return (
    <div className='h-auto w-auto bg-slate-400'>
      <Navbar />

      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Hero />} />
        
        {/* Cuisine List Page */}
        <Route path="cuisdetail" element={<CuisineList />} />
        
        {/* Food Details Page */}
        <Route path="/meals/:idMeal" element={<Fooddetail />} />
        
        {/* Ingredients List Page */}
        <Route path="/ingredients" element={<IngredientsList />} />
        
        {/* Chicken Meals Page based on ingredient */}
        <Route path="/mealsa/:ingredient" element={<ChickenMeals />} />
        
        {/* Meal Detail Page */}
        <Route path="meal/:data" element={<MealDetailPage />} />
        
        {/* Pork Meals Page */}
        <Route path="/pork" element={<PorkMeals />} />
      </Routes>
    </div>
  );
};

export default App;
