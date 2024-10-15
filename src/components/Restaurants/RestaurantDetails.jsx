import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RestaurantDetails = ({ restaurant, onClose }) => {
    const [photoUrl, setPhotoUrl] = useState(null);

    // Fetch the photo from Google Maps API using Axios
    useEffect(() => {
        const fetchPhoto = async () => {
            if (restaurant.photos && restaurant.photos.length > 0) {
                try {
                    const response = await axios.get('https://google-map-places.p.rapidapi.com/maps/api/place/photo', {
                        params: {
                            maxwidth: '400',
                            photoreference: restaurant.photos[0].photo_reference,
                        },
                        headers: {
                            'X-RapidAPI-Key': 'your_rapidapi_key', // Replace with your API key
                            'X-RapidAPI-Host': 'google-map-places.p.rapidapi.com',
                        },
                    });

                    setPhotoUrl(response.request.responseURL);
                } catch (error) {
                    console.error('Error fetching the photo:', error);
                }
            }
        };

        fetchPhoto();
    }, [restaurant.photos]);

    return (
        <div className="recipe-card mx-auto bg-white bg-opacity-40 shadow-md rounded-lg overflow-hidden backdrop-blur-lg flex flex-col" 
             style={{ height: '90vh', width: '60vw', position: 'relative', flexDirection: 'row' }}>
             
            <div className="flex-shrink-0">
                {photoUrl ? (
                    <img
                        src={photoUrl}
                        alt="Restaurant"
                        className="object-cover h-1/2 w-full p-5 rounded-tl-lg rounded-tr-lg"
                    />
                ) : (
                    <p className="text-gray-500 p-5">Loading photo...</p>
                )}
            </div>

            <div className="flex flex-col justify-between p-4 overflow-y-auto flex-1" style={{ maxHeight: 'calc(80vh - 30px)', paddingTop: '20px' }}>
                <h2 className="text-2xl font-bold mb-2">{restaurant.name}</h2>
                <p className="text-gray-600 mb-2">{restaurant.adr_address}</p>
                <p className="text-gray-600 mb-2">Phone: {restaurant.formatted_phone_number}</p>
                <p className="text-yellow-500 font-semibold mb-4">Rating: {restaurant.rating} ⭐</p>

                <h2 className="text-lg font-semibold mb-2">Overview:</h2>
                <p className="text-gray-700">{restaurant?.editorial_summary?.overview}</p>

                <h2 className="mt-4 text-lg font-semibold">Reviews:</h2>
                <div className="space-y-4 overflow-y-auto max-h-60">
                    {restaurant.reviews.map((review, index) => (
                        <div key={index} className="p-4 border rounded-md shadow-sm bg-gray-50">
                            <p className="font-semibold">{review.author_name}</p>
                            <p className="text-yellow-500">Rating: {review.rating} ⭐</p>
                            <p className="text-gray-700">{review.text}</p>
                            <p className="text-gray-500 text-sm">{review.relative_time_description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Optional: Close button to close the restaurant details */}
        
        </div>
    );
};

export default RestaurantDetails;
