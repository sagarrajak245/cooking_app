import React, { useEffect, useState } from 'react';
import './RecipieCardCss.css'; 
import { FaYoutube, FaBookReader } from 'react-icons/fa';

const RecipeCard = ({ recipe }) => {
  const {
    label,
    image,
    url,
    yield: servings,
    dietLabels,
    healthLabels,
    mealType,
    ingredients,
    calories,
    totalCO2Emissions,
    co2EmissionsClass,
    totalWeight,
    totalTime,
    dishType,
    totalNutrients,
    totalDaily,
    digest
  } = recipe;

  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [showNutrientPopup, setShowNutrientPopup] = useState(false);
  const [showTotalDaily, setShowTotalDaily] = useState(false);
  const [showDigest, setShowDigest] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'auto';
    };
  }, []);

  const toggleSection = (section) => {
    setActiveSection((prev) => (prev === section ? '' : section));
  };

  const Button = ({ href, children, icon }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="cursor-pointer group relative flex items-center justify-center gap-1.5 px-2 py-1 bg-black bg-opacity-80 text-white rounded-full hover:bg-opacity-70 transition font-semibold shadow-md"
    >
      {icon}
      {children}
      <div className="absolute opacity-0 -bottom-full rounded-md py-2 px-2 bg-black bg-opacity-70 left-1/2 -translate-x-1/2 group-hover:opacity-100 transition-opacity shadow-lg">
        {children}
      </div>
    </a>
  );

  const closeIngredientPopup = () => {
    setSelectedIngredient(null);
  };

  const toggleNutrientPopup = () => {
    setShowNutrientPopup((prev) => !prev);
  };

  const toggleTotalDaily = () => {
    setShowTotalDaily((prev) => !prev);
  };
  const toggleDigest = () => {
    setShowDigest((prev) => !prev);
    };
  return (
    <div className="recipe-card mx-auto bg-white bg-opacity-40 shadow-md rounded-lg overflow-hidden backdrop-blur-lg flex flex-col"
      style={{
        height: '90vh',
        width: '60vw',
        position: 'relative',
        flexDirection: 'row',
      }}
    >
            <AntSVG id="ant1" />
                <AntSVG id="ant2" />
                <AntSVG id="ant3" />
                <AntSVG id="ant4" />
                <AntSVG id="ant5" />
                <AntSVG id="ant6" />
                <AntSVG id="ant4" />
      <div className="flex-shrink-0">
        <img
          src={image}
          alt={label}
          className="object-cover h-1/2 w-full p-5 rounded-tl-lg rounded-tr-lg"
        />
        <div className="flex flex-col items-center gap-2">
          <Button href={url} icon={<FaBookReader size={20} />}>
            Recipe
          </Button>
          <Button
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(label)}`}
            icon={<FaYoutube size={20} />}
          >
            Explore
          </Button>
        </div>
        <div className="mb-4 p-5">
          <h3 className="font-semibold">Meal Type :</h3>
          <ul className="list-disc list-inside">
            {mealType.map((mealtype, meal) => (
              <li key={meal} className="text-gray-600">{mealtype}</li>
            ))}
          </ul>
          <div className="border-t border-gray-300 my-4"></div>
          <h3 className="font-semibold">Dish Type :</h3>
          <ul className="list-disc list-inside">
            {dishType.map((dishType, dish) => (
              <li key={dish} className="text-gray-600">{dishType}</li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className="flex flex-col justify-between p-4 overflow-y-auto flex-1"
        style={{ maxHeight: 'calc(80vh - 30px)', paddingTop: '20px' }}
      >
        <div>
          <h2 className="text-2xl font-bold mb-2">{label}</h2>
          <p className="text-gray-700 mb-4">
            Yield: {servings} servings | Calories: {Math.round(calories)} kcal
          </p>
          <div className="border-t border-gray-300 my-4"></div>
          <p className="text-gray-700 mb-2">
            CO2 Emissions: {totalCO2Emissions.toFixed(2)} g (Class: {co2EmissionsClass})
          </p>
          <p className="text-gray-700 mb-4">
            Total Time: {totalTime} minutes | Total Weight: {totalWeight.toFixed(2)} g
          </p>
          <div className="border-t border-gray-300 my-4"></div>
          <div className="mb-4">
            <h3 className="font-semibold">Diet Labels:</h3>
            <ul className="list-disc list-inside">
              {dietLabels.map((label, index) => (
                <li key={index} className="text-gray-600">{label}</li>
              ))}
            </ul>
          </div>
          <div className="border-t border-gray-300 my-4"></div>

          <div className="mb-4">
            <h3
              className="font-semibold cursor-pointer"
              onClick={() => toggleSection('health')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && toggleSection('health')}
            >
              Health Labels {activeSection === 'health' ? '▲' : '▼'}
            </h3>
            {activeSection === 'health' && (
              <ul className="list-disc list-inside">
                {healthLabels.map((label, index) => (
                  <li key={index} className="text-gray-600">{label}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="border-t border-gray-300 my-4"></div>
          <div className="mb-4">
            <h3 className="font-semibold">Ingredients</h3>
            <ul className="list-disc">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-600">
                  <h5
                    className="font-semibold cursor-pointer hover:bg-gray-200 transition-colors duration-300 p-1 rounded"
                    onClick={() => setSelectedIngredient(ingredient)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedIngredient(ingredient)}
                  >
                    {ingredient.text}
                  </h5>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mb-4">
            <h3 className="font-semibold">Nutrients Details</h3>
            <button
              onClick={toggleNutrientPopup}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Show Total Nutrients
            </button>
            <button
              onClick={toggleTotalDaily}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Show Total Daily
            </button>
            <div className="border-t border-gray-300 my-4"></div>
            <button
              onClick={toggleDigest}
              className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-md"
            >
              Digest
            </button>
          </div>
      </div>
    
 {selectedIngredient && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-4 max-w-sm mx-auto">
            <h2 className="text-xl font-bold mb-2">{selectedIngredient.food}</h2>
            <div className="flex items-center mb-2">
              <img 
                src={selectedIngredient.image} 
                alt={selectedIngredient.foodId} 
                className="h-16 w-16 mr-2 rounded"
              />
              <div>
                <p className="font-semibold">{selectedIngredient.text}</p>
                <p>{selectedIngredient.quantity} {selectedIngredient.measure}</p>
                <p>Weight: {selectedIngredient.weight.toFixed(2)} g</p>
                <p>Category: {selectedIngredient.foodCategory}</p>
              </div>
            </div>
            <button 
              onClick={closeIngredientPopup} 
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showNutrientPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-4 max-w-sm mx-auto overflow-hidden shadow-lg">
            <h2 className="text-xl font-bold mb-2 text-center">Total Nutrients</h2>
            <div className="max-h-[70vh] overflow-y-auto">
              <ul className="space-y-2">
                {Object.entries(totalNutrients).map(([key, value]) => (
                  <li key={key} className="text-gray-700">
                    <span className="font-semibold">{key}:</span> {value.quantity} {value.unit}
                  </li>
                ))}
              </ul>
            </div>
            <button 
              onClick={toggleNutrientPopup} 
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md w-full transition duration-200 hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

{showDigest && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-540">
    <div className="bg-white rounded-lg p-6 max-w-md mx-auto overflow-hidden shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Digest Details</h2>
      <div className="max-h-[70vh] overflow-y-auto">
        <ul className="list-disc">
          {digest.map((nutrient) => (
            <li key={nutrient.tag} className="text-gray-700 mb-4">
              <div className="flex justify-between items-center">
                <h5
                  className="font-semibold text-lg cursor-pointer hover:bg-gray-200 transition-colors duration-300 p-2 rounded"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveNutrient(nutrient)}
                >
                  {nutrient.label}
                </h5>
                <div className="flex flex-col items-end">
                  <span className="text-sm text-gray-500">Total: {nutrient.total} {nutrient.unit}</span>
                  <span className="text-sm text-gray-500">Daily: {nutrient.daily} {nutrient.unit}</span>
                </div>
              </div>
              {nutrient.sub && nutrient.sub.length > 0 && (
                <ul className="ml-4 mt-2 list-disc">
                  {nutrient.sub.map((sub) => (
                    <li key={sub.tag} className="text-gray-600 mb-2">
                      <span className="font-semibold">{sub.label}</span>
                      <ul className="mt-1 ml-2">
                        <li>
                          <span className="font-medium">Total:</span> {sub.total} {sub.unit}
                        </li>
                        <li>
                          <span className="font-medium">Daily:</span> {sub.daily} {sub.unit}
                        </li>
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <button 
        onClick={toggleDigest} 
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md w-full transition duration-200 hover:bg-red-600"
      >
        Close
      </button>
    </div>
  </div>
)}


 

    </div>
  );
};

      {/* Nutrient Details Popup
      {showNutrientPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-4 max-w-sm mx-auto">
            <h2 className="text-xl font-bold mb-2">Total Nutrients</h2>
            <ul>
              {Object.entries(totalNutrients).map(([key, value]) => (
                <li key={key} className="text-gray-600">
                  {key}: {value.quantity} {value.unit}
                </li>
              ))}
            </ul>
            <button 
              onClick={toggleNutrientPopup} 
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )} */}

export default RecipeCard;

const AntSVG = ({ id }) => (
    <svg id={id} className="ants" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.39 53.12" aria-label={id}>
        <path d="M539.22,398.8a20.17,20.17,0,0,0,3-10.91,14,14,0,0,1,6.22-12.12c.58-.41.56-1.79.6-2.74,0-.18-1-.44-1.53-.61a10.21,10.21,0,0,1-2.52-.74,3.21,3.21,0,0,0-3.17-.18,16.22,16.22,0,0,1-5,.34c-.4,0-.8-.54-1.2-.83l.17-.32c.3.09.6.16.89.27a4.36,4.36,0,0,0,4.08-.16c1.9-1.12,3.92-1.5,5.88.08a8.9,8.9,0,0,0,1.79.86c.43-2.45.07-4.19-1.94-5.61-1.13-.8-1.77-2.3-2.59-3.51a4.82,4.82,0,0,1-.58-1.2c-.89-2.69-3.22-3.93-5.38-5.33a8.47,8.47,0,0,1-.86-.64c-.09-.07-.11-.23-.32-.71.74.37,1.22.58,1.67.83,1.32.74,2.66,1.45,3.92,2.28a3.13,3.13,0,0,1,1,1.45,13.54,13.54,0,0,0,4.09,6l1.88-2.86c-2.65-.24-3.22-1.08-2.51-3.8.22-.86.56-1.68.91-2.71-1.3-.4-2.55-.85-3.83-1.17a3,3,0,0,1-2.21-1.94c-1-2.31-1.82-4.69-3.92-6.3-.13-.1-.11-.38.08-.83.42.31,1,.52,1.24.94,1,1.66,1.92,3.41,3,5.06a5.58,5.58,0,0,0,1.66,1.73,19.86,19.86,0,0,0,2.81,1.25c1,.44,2,.88,3.13.07a1.68,1.68,0,0,1,1.42-.13c1.29.57,2.27-.17,3.4-.52,2.45-.75,4.18-2,4.47-4.76a3.2,3.2,0,0,1,2.11-2.53,3.33,3.33,0,0,1-.26.82,9.36,9.36,0,0,0-2,5,1.67,1.67,0,0,1-1.59,1.65c-1.33.26-2.62.7-3.87,1a38.19,38.19,0,0,1,1.09,4c.36,2.31-.35,3.06-2.8,3l1.91,3a46.1,46.1,0,0,0,3-4.59c.74-1.48,1.2-2.93,3-3.58,1.38-.49,2.57-1.55,4.06-2.15a2.18,2.18,0,0,1-.39.65,8.37,8.37,0,0,1-1.66,1.13c-2.62,1.17-3.78,3.5-4.92,5.91a11.72,11.72,0,0,1-2.19,3.19c-2.42,2.44-2.18,2.73-2,5.77a7.21,7.21,0,0,0,1.52-.72c1.88-1.54,3.86-1.32,5.75-.2a4.4,4.4,0,0,0,4.45.1c.2-.09.41-.15.61-.22l.26.36c-.55.34-1.1,1-1.66,1-1.8,0-3.66.35-5.35-.72a2.33,2.33,0,0,0-1.56.07c-1.22.33-2.43.73-3.63,1.13a1.85,1.85,0,0,0-.86.47c-.28.35.41,3,.78,3.36.79.72,1.59,1.43,2.36,2.18,2.78,2.68,3.25,6.16,3.36,9.75a22.41,22.41,0,0,0,2.87,10.44,1.74,1.74,0,0,1-1.64-1.54c-.86-3.41-2.14-6.72-2.29-10.31-.14-3.25-.56-4.16-1.89-5.52a24.93,24.93,0,0,1-.17,4.45,12.52,12.52,0,0,1-1.68,4.17c-1.53,2.36-4.41,2.28-6-.05-1.85-2.67-2.05-5.66-1.53-8.76.06-.35.16-.69.25-1.07a6.81,6.81,0,0,0-2.94,5.69c-.17,3.81-1.31,7.38-2.26,11A2.54,2.54,0,0,1,539.22,398.8Z" transform="translate(-535.68 -345.68)"/>
    </svg>
);


