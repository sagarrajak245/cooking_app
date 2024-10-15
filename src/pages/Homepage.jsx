import React, { useEffect, useState } from 'react';
import RecipeCard from "../components/ReceipieCard"; // Ensure correct import name (corrected from 'ReceipieCard' to 'RecipeCard')
import RecipeDetail from '../components/RecipeDetailes'; // Corrected component name
import { getRandomColor } from '../lib/utils.js';
import axios from 'axios';
import { Search } from "lucide-react";
import Sidebar from "../components/Sidebar.jsx"; // Import Sidebar

const appKey = "f8cc86348ecb9a8ae9d35ababf36a011";
const appId = "24a28f6f";

const Homepage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hoveredRecipe, setHoveredRecipe] = useState(null);

  const fetchRecipes = async (searchQuery) => {
    setLoading(true);
    setRecipes([]);
    try {
      const res = await fetch(
        `https://api.edamam.com/api/recipes/v2?app_id=${appId}&app_key=${appKey}&q=${searchQuery}&type=public`
      );

      const data = await res.json();
      setRecipes(data.hits);
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipeDetails = async (id) => {
    console.log("Hovered Recipe ID:", id); // Log the recipe ID
    try {
      const response = await axios.get(
        `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${appId}&app_key=${appKey}`
      );
      setHoveredRecipe(response.data.recipe);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  useEffect(() => {
    fetchRecipes("gulab jamun");
  }, []);

  const handleSearchRecipe = (e) => {
    e.preventDefault();
    const searchQuery = e.target[0].value;
    fetchRecipes(searchQuery);
  };

  return (
    <div className="bg-[#faf9fb] p-10 flex">
      <Sidebar /> {/* Sidebar component here */}

      <div className="max-w-screen-lg mx-auto flex-1"> {/* Ensures that the content takes the remaining space */}
        <form onSubmit={handleSearchRecipe}>
          <label className="input shadow-md flex items-center gap-2">
            <Search size={24} />
            <input
              type="text"
              placeholder="Search for recipes"
              className="w-full text-sm md:text-md grow"
            />
          </label>
        </form>
        <p className="text-3xl font-bold md:text-5xl mt-4">Recommended Recipes</p>
        <p className="text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight">Popular Choices</p>

        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {!loading &&
            recipes.map(({ recipe }, index) => (
              <RecipeCard
                key={index}
                recipe={recipe}
                {...getRandomColor()}
                onHover={fetchRecipeDetails} // Pass the fetch function as a prop
              />
            ))}

          {loading &&
            [...Array(9)].map((_, index) => (
              <div key={index} className='flex flex-col gap-4 w-full'>
                <div className='skeleton h-32 w-full'></div>
                <div className='flex justify-between'>
                  <div className='skeleton h-4 w-28'></div>
                  <div className='skeleton h-4 w-24'></div>
                </div>
                <div className='skeleton h-4 w-1/2'></div>
              </div>
            ))}
        </div>

        {hoveredRecipe && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <RecipeDetail recipe={hoveredRecipe} />
            <button
              onClick={() => setHoveredRecipe(null)}
              className="absolute top-4 right-4 text-white"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
