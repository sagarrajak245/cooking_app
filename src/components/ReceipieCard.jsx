



//api


import axios from 'axios'; // Add axios for making HTTP requests
import { Heart, HeartPulse, Soup } from "lucide-react";
import { useEffect, useState } from "react";

const getTwoValuesFromArray = (arr) => {
  return [arr[0], arr[1]];
};

const RecipeCard = ({ recipe, bg, badge }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [recipeDetails, setRecipeDetails] = useState("");

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isRecipeFavorite = favorites.some((fav) => fav.label === recipe.label);
    setIsFavorite(isRecipeFavorite);
  }, [recipe.label]);

  const addRecipeToFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isRecipeAlreadyInFavorites = favorites.some((fav) => fav.label === recipe.label);

    if (isRecipeAlreadyInFavorites) {
      favorites = favorites.filter((fav) => fav.label !== recipe.label);
      setIsFavorite(false);
    } else {
      favorites.push(recipe);
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const healthLabels = getTwoValuesFromArray(recipe.healthLabels);

  const fetchRecipeDetails = async () => {
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {  // Replace with your OpenAI API key
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: `Provide detailed information and preparation steps for the recipe: ${recipe.label}.` }
        ]
      }, {
        headers: {
          "Authorization": `Bearer YOUR_API_KEY_HERE`,
          "Content-Type": "application/json"
        }
      });

      setRecipeDetails(response.data.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  const handleRecipeButtonClick = async () => {
    await fetchRecipeDetails();
    setShowDialog(true);
  };

  return (
    <div className={`flex flex-col rounded-md ${bg} overflow-hidden p-3 relative`}>
      <a
        href={`https://www.youtube.com/results?search_query=${recipe.label} recipe`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative h-32"
      >
        <div className="skeleton absolute inset-0" />
        <img
          src={recipe.image}
          alt="recipe img"
          className="rounded-md w-full h-full object-cover cursor-pointer opacity-0 transition-opacity duration-500"
          onLoad={(e) => {
            e.currentTarget.style.opacity = 1;
            e.currentTarget.previousElementSibling.style.display = "none";
          }}
        />
        <div className="absolute bottom-2 left-2 bg-white rounded-full p-1 cursor-pointer flex items-center gap-1 text-sm">
          <Soup size={16} /> {recipe.yield} Servings
        </div>

        <div
          className="absolute top-1 right-2 bg-white rounded-full p-1 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            addRecipeToFavorites();
          }}
        >
          {!isFavorite && <Heart size={17} className="hover:fill-red-600 hover:text-red-500" />}
          {isFavorite && <Heart size={17} className="fill-red-600 text-red-500" />}
        </div>
      </a>

      <div className="flex mt-1">
        <p className="font-bold tracking-wide">{recipe.label}</p>
      </div>
      <p className="my-2">
        {recipe.cuisineType[0].charAt(0).toUpperCase() + recipe.cuisineType[0].slice(1)} Kitchen
      </p>

      <div className="flex gap-2 mt-auto">
        {healthLabels.map((label, idx) => (
          <div key={idx} className={`flex gap-1 ${badge} items-center p-1 rounded-md`}>
            <HeartPulse size={16} />
            <span className="text-sm tracking-tighter font-semibold">{label}</span>
          </div>
        ))}
      </div>

      <button
        onClick={handleRecipeButtonClick}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Get Recipe Details
      </button>

      {/* Dialog box */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-80 max-w-full">
            <h2 className="text-lg font-bold mb-4">Recipe Details</h2>
            <p>{recipeDetails}</p>
            <button
              onClick={() => setShowDialog(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;
