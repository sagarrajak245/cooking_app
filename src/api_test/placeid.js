import https from 'https';

const API_KEY = '428b6a3040msh2be13728b051406p15090bjsn4331577da765'; // Your RapidAPI key

const getRestaurantIds = () => {
    const options = {
        method: 'GET',
        hostname: 'google-map-places.p.rapidapi.com',
        port: null,
        path: '/maps/api/place/textsearch/json?query=restaurants%20in%20Ambernath&radius=1000&location=40%2C-110&language=en&region=en',
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'google-map-places.p.rapidapi.com'
        }
    };

    const req = https.request(options, (res) => {
        const chunks = [];

        res.on('data', (chunk) => {
            chunks.push(chunk);
        });

        res.on('end', () => {
            const body = Buffer.concat(chunks).toString();
            try {
                const data = JSON.parse(body);
                // Check if there are results
                if (data.results && data.results.length > 0) {
                    // Extract the place IDs (restaurant IDs)
                    const restaurantIds = data.results.map((place) => place.place_id);
                    console.log('Restaurant IDs:', restaurantIds);
                    // Fetch details for each restaurant ID
                    restaurantIds.forEach(getRestaurantDetails);
                } else {
                    console.log('No restaurants found.');
                }
            } catch (error) {
                console.error('Error parsing response:', error);
            }
        });
    });

    req.on('error', (e) => {
        console.error('Request error:', e);
    });

    req.end();
};

const getRestaurantDetails = (placeId) => {
    const options = {
        method: 'GET',
        hostname: 'google-map-places.p.rapidapi.com',
        port: null,
        path: `/maps/api/place/details/json?place_id=${placeId}&fields=all&language=en`,
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'google-map-places.p.rapidapi.com'
        }
    };

    const req = https.request(options, (res) => {
        const chunks = [];

        res.on('data', (chunk) => {
            chunks.push(chunk);
        });

        res.on('end', () => {
            const body = Buffer.concat(chunks).toString();
            try {
                const data = JSON.parse(body);
                console.log(`Details for ${placeId}:`, data.result);
            } catch (error) {
                console.error(`Error parsing details for ${placeId}:`, error);
            }
        });
    });

    req.on('error', (e) => {
        console.error('Request error:', e);
    });

    req.end();
};

// Start by getting restaurant IDs
getRestaurantIds();
