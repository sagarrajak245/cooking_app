
import React, { useEffect, useState } from 'react';
import RecipeCard from './components/RecipeDetailes';
import axios from 'axios';

const GetRecipe = () => {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          'https://api.edamam.com/api/recipes/v2/recipe_8d3e4b9299664a1ca8e6f5bdb8532300?type=public&app_id=24a28f6f&app_key=f8cc86348ecb9a8ae9d35ababf36a011'
        );
        console.log(response.data.recipe);
        setRecipe(response.data.recipe);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {recipe ? (
        <RecipeCard recipe={recipe} />
      ) : (
        <p>Loading recipe...</p>
      )}
    </div>
  );
};

export default GetRecipe;
