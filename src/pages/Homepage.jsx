
import { useEffect, useState } from 'react';
import { getRandomColor } from '../lib/utils.js';

import { Search } from "lucide-react";
import ReceipieCard from "../components/ReceipieCard.jsx"; // Use PascalCase for components


const appKey ="f8cc86348ecb9a8ae9d35ababf36a011" ;
const appId ="24a28f6f"; 









function Homepage() {
  // Use state to store recipes
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async (searchQuery) => {
    setLoading(true);
    setRecipes([]); // Correctly reset recipes to empty array
    try {
      const res = await fetch(
        `https://api.edamam.com/api/recipes/v2?app_id=${appId}&app_key=${appKey}&q=${searchQuery}&type=public`
      );

      const data = await res.json();
      console.log(data);

      // Set the fetched recipes to the state
      setRecipes(data.hits);

    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes("gulab jamun");
  }, []);


const handlesearchrecipie=(e)=>{
    e.preventDefault();
  const searchQuery=e.target[0].value;
    fetchRecipes(searchQuery);
}





  return (
    <div className="bg-[#faf9fb] p-10 flex-1">
      <div className="max-w-screen-lg mx-auto">
        <form    onSubmit={handlesearchrecipie}>
          <label className="input shadow-md flex items-center gap-2">
            <Search size={24} />
            <input
              type="text"
              placeholder="Search for recipes"
              className="w-full text-sm md:text-md grow"
            />
          </label>
        </form>
        <p className="text-3xl font-bold md:text-5xl mt-4">
          Recommended Recipes
        </p>

        <p className="text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight">
          Popular Choices
        </p>

        {/* Grid Container */}
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
         

          {!loading &&
            recipes.map(({ recipe }, index) => (
							<ReceipieCard  key={index} recipe={recipe} {...getRandomColor()}  />
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
      </div>
    </div>  
  );
}

export default Homepage;
