// utils/distanceCalculator.js
import { getDistanceAndTime } from "../services/mapServices.js";

export async function calculateDistanceTime(origin, destination) {
  if (!origin || !destination) throw new Error("Origin and destination are required");

  const [origLat, origLng] = origin.split(',').map(Number);
  const [destLat, destLng] = destination.split(',').map(Number);

  if ([origLat, origLng, destLat, destLng].some(isNaN)) {
    throw new Error("Invalid coordinates format. Use 'lat,lng'");
  }

  const result = await getDistanceAndTime(
    { lat: origLat, lng: origLng },
    { lat: destLat, lng: destLng }
  );

  return {
    distance: result.distance, // in meters
    time: result.time // in seconds
  };
}
