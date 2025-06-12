import axios from "axios";

export async function getAddressCoordinate(address) {
  const apiKey = process.env.GEOAPIFY_API_KEY;
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${apiKey}`;

  try {
    const { data } = await axios.get(url);
    const [lng, lat] = data.features[0]?.geometry.coordinates || [];

    if (!lat || !lng) {
      throw new Error("Coordinates not found for the given address.");
    }

    return { lat, lng };
  } catch (error) {
    console.error("Geoapify Error:", error.message);
    throw error;
  }
}

export async function getDistanceAndTime(origin, destination) {
  const apiKey = process.env.GEOAPIFY_API_KEY;
  const url = `https://api.geoapify.com/v1/routing?waypoints=${origin.lat},${origin.lng}|${destination.lat},${destination.lng}&mode=drive&apiKey=${apiKey}`;

  try {
    const { data } = await axios.get(url);
    const info = data.features[0]?.properties;

    if (!info) throw new Error("Distance or time data not found.");

    return {
      distance: info.distance,      // in meters
      time: info.time               // in seconds
    };
  } catch (error) {
    console.error("Geoapify Routing Error:", error.message);
    throw error;
  }
}


export async function getSuggestions(input) {
  if (!input) throw new Error('query is required');

  const apiKey = process.env.GEOAPIFY_API_KEY;
  const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(input)}&limit=10&apiKey=${apiKey}`;

  try {
    const { data } = await axios.get(url);
    return data.features.map((feature) => ({
      name: feature.properties.formatted,
      lat: feature.geometry.coordinates[1],
      lng: feature.geometry.coordinates[0],
    }));
  } catch (error) {
    console.error("Geoapify Autocomplete Error:", error.message);
    throw error;
  }
}

