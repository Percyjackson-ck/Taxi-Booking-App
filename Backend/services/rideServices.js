import { getDistanceTime } from "../controllers/mapController.js"
import rideModel from "../models/rideModel.js"
async function getFare(pickup, destination) {
  if (!pickup) throw new Error('Pickup is required');
  if (!destination) throw new Error('Destination is required');

  const distanceTime = await getDistanceTime(pickup, destination);
//   console.log(distanceTime);
}


