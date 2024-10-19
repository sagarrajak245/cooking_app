import https from 'https';

const cityQuery = 'Australia'; // Replace with the desired city name
const googlePlaceId = 'ChIJ68aBlEKuEmsRHUA9oME5Zh0'; // Replace with the actual Google Place ID if needed

const options = {
  method: 'GET',
  hostname: 'the-fork-the-spoon.p.rapidapi.com',
  port: null,
  path: `/locations/v2/list?google_place_id=${encodeURIComponent(googlePlaceId)}&geo_ref=false&geo_text=${encodeURIComponent(cityQuery)}&geo_type=locality`,
  headers: {
    'x-rapidapi-key': '92cb3bc09dmshbb6ea0abec2d64bp13bf86jsna1d0dec0a303', // Replace with your RapidAPI key
    'x-rapidapi-host': 'the-fork-the-spoon.p.rapidapi.com'
  }
};

const req = https.request(options, (res) => {
  const chunks = [];

  res.on('data', (chunk) => {
    chunks.push(chunk);
  });

  res.on('end', () => {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.end();
