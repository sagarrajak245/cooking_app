import React, { useEffect, useState } from 'react';
import RestaurantCard from './RestaurantCard';
import RestaurantDetails from './RestaurantDetails';

const API_KEY = 'b21437bb38mshba48ba356ed819ap125fc0jsn7aa21d4fbab2';

const dummyRestaurants = [
    {
        place_id: '1',
        name: 'The Best Pizza',
        adr_address: '123 Pizza Street, Ambernath',
        business_status: 'OPERATIONAL',
        icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
        rating: 4.5,
    },
];

const Restaurant = () => {
    const [restaurants, setRestaurants] = useState(dummyRestaurants);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    const fetchRestaurants = async () => {
        if (!query) return;
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://google-map-places.p.rapidapi.com/maps/api/place/textsearch/json?query=restaurants%20in%20${query}&radius=1000&location=40%2C-110&language=en&region=en`,
                {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': API_KEY,
                        'x-rapidapi-host': 'google-map-places.p.rapidapi.com',
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const data = await response.json();
            const restaurantDetailsPromises = data.results.map(getRestaurantDetails);
            const restaurantDetails = await Promise.all(restaurantDetailsPromises);
            const validRestaurants = restaurantDetails.filter(Boolean);
            setRestaurants(validRestaurants);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching restaurants:', error);
        } finally {
            setLoading(false);
        }
    };

    const getRestaurantDetails = async (place) => {
        try {
            const response = await fetch(
                `https://google-map-places.p.rapidapi.com/maps/api/place/details/json?place_id=${place.place_id}&fields=all&language=en`,
                {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': API_KEY,
                        'x-rapidapi-host': 'google-map-places.p.rapidapi.com',
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Error fetching details for place ID ${place.place_id}: ${response.statusText}`);
            }

            const data = await response.json();
            if (data.result) {
                const { name, business_status, icon, rating, address_components } = data.result;
                const adr_address = parseAddressComponents(address_components);

                return {
                    place_id: place.place_id,
                    name,
                    adr_address,
                    business_status,
                    icon,
                    rating,
                };
            }

            return null;
        } catch (error) {
            console.error(`Error fetching details for place ID ${place.place_id}:`, error);
            return null;
        }
    };

    const parseAddressComponents = (address_components) => {
        // Parsing logic here...
        return 'Parsed Address';
    };

    const handleSearch = () => {
        fetchRestaurants();
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="mb-4 flex justify-center">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for restaurants..."
                    className="border border-gray-300 p-2 rounded-l-lg"
                />
                <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded-r-lg">
                    Search
                </button>
            </div>

            {loading ? (
                <div className="text-center text-xl mt-10">Loading...</div>
            ) : error ? (
                <div className="text-center text-red-500 mt-10">Error: {error}</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {restaurants.map((restaurant) => (
                        <RestaurantCard 
                        restaurant={someRestaurant} 
                        onHover={handleHover} 
                        onClick={handleRestaurantClick} // Pass the click handler here
                    />
                    ))}
                </div>
            )}

            {/* Floating overlay for Restaurant Details */}
            {selectedRestaurant && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
                        <RestaurantDetails
                            restaurant={selectedRestaurant}
                            onClose={() => setSelectedRestaurant(null)}
                        />
                        <button
                            onClick={() => setSelectedRestaurant(null)}
                            className="bg-red-500 text-white px-4 py-2 mt-4 rounded-full float-right"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Restaurant;
