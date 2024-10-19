import { Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";

const RestaurantCard = ({ restaurant, onHover, onClick }) => { // Added onClick to props
    const [isFavorite, setIsFavorite] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const isRestaurantFavorite = favorites.some((fav) => fav.name === restaurant.name);
        setIsFavorite(isRestaurantFavorite);
    }, [restaurant.name]);

    const addRestaurantToFavorites = () => {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const isRestaurantAlreadyInFavorites = favorites.some((fav) => fav.name === restaurant.name);

        if (isRestaurantAlreadyInFavorites) {
            favorites = favorites.filter((fav) => fav.name !== restaurant.name);
            setIsFavorite(false);
        } else {
            favorites.push(restaurant);
            setIsFavorite(true);
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
        if (onHover) {
            onHover(restaurant.name); // Ensure onHover is defined before calling
        }
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    const renderStars = (rating) => {
        const filledStars = Math.round(rating);
        const stars = Array.from({ length: 5 }, (_, index) => (
            <Star key={index} size={16} className={index < filledStars ? "text-yellow-500" : "text-gray-300"} />
        ));
        return <div className="flex gap-1">{stars}</div>;
    };

    return (
        <div
            className="flex flex-col rounded-md bg-white overflow-hidden p-3 relative shadow-lg cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => onClick(restaurant)} // Ensure onClick is defined
        >
            <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative h-32"
            >
                <div className="skeleton absolute inset-0" />
                <img
                    src={restaurant.icon}
                    alt={`${restaurant.name} image`}
                    className="rounded-md w-full h-full object-cover cursor-pointer opacity-0 transition-opacity duration-500"
                    onLoad={(e) => {
                        e.currentTarget.style.opacity = 1;
                        e.currentTarget.previousElementSibling.style.display = "none";
                    }}
                />
                <div
                    className="absolute top-2 right-2 bg-white rounded-full p-1 cursor-pointer"
                    onClick={(e) => {
                        e.preventDefault();
                        addRestaurantToFavorites();
                    }}
                >
                    {!isFavorite ? (
                        <Heart size={17} className="hover:fill-red-600 hover:text-red-500" />
                    ) : (
                        <Heart size={17} className="fill-red-600 text-red-500" />
                    )}
                </div>
            </a>

            <div className="flex mt-1">
                <p className="font-bold tracking-wide">{restaurant.name}</p>
            </div>
            <p className="my-2">{restaurant.adr_address || 'Address not available'}</p>
            <p className="text-sm">{restaurant.business_status === 'OPERATIONAL' ? 'Open' : 'Closed'}</p>

            <div className="flex items-center mt-2">
                {renderStars(restaurant.rating)}
            </div>

            {isHovering && (
                <div className="absolute inset-0 bg-black opacity-30 rounded-md"></div>
            )}
        </div>
    );
};

export default RestaurantCard;
