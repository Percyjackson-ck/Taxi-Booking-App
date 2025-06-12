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
