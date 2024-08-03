
import err from '../assets/404.svg';
import ReceipieCard from '../components/ReceipieCard';
import { getRandomColor } from '../lib/utils';


function Favoritepage() {
const favorites=JSON.parse(localStorage.getItem("favorites")) || [];



  return (
    <div className="bg-[#faf9fb] flex-1 p-10 min-h-screen">
      <div className="max-w-screen-lg mx-auto">
        <p className="font-bold text-3xl md:text-5xl my-4">My Favorites</p>
        {favorites.length === 0 && ( 
          <div className="flex flex-col items-center gap-4">
            <img src={err} alt="404" className="w-72" />
            <p className="text-lg text-center">No favorites found</p>
          </div>
        )}

        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
{favorites.map((recipe) => (
              <ReceipieCard key={recipe.label} recipe={recipe}   {...getRandomColor()} />
            ))}
 



          </div>
        
      </div>
    </div>
  );
} 

export default Favoritepage;
