import { getAddressCoordinate,getDistanceAndTime} from "../services/mapServices.js";
import rideModel from "../models/rideModel.js"

async function getFare(pickup, destination) {
  if (!pickup) throw new Error('Pickup is required');
  if (!destination) throw new Error('Destination is required');
const originCoordinates = await getAddressCoordinate(pickup);
const destinationCoordinates = await getAddressCoordinate(destination);

const originnew = `${originCoordinates.lat},${originCoordinates.lng}`;
const destinationnew = `${destinationCoordinates.lat},${destinationCoordinates.lng}`;

const distanceTime = await getDistanceAndTime(originnew, destinationnew);

//   console.log(distanceTime);
   const baseFare={
    auto:30,
    car:50,
    motorcycle:20,
   }
   const perKmRate={
    auto:10,
    car:15,
    motorcycle:8,
   }
   const perMinuteRate={
    auto:2,
    car:3,
    motorcycle:1.5
   }
  const fare = {
  auto: Math.round((baseFare.auto + (distanceTime.distance / 1000 * perKmRate.auto) + (distanceTime.time / 60 * perMinuteRate.auto)) * 100) / 100,
  car: Math.round((baseFare.car + (distanceTime.distance / 1000 * perKmRate.car) + (distanceTime.time / 60 * perMinuteRate.car)) * 100) / 100,
  motorcycle: Math.round((baseFare.motorcycle + (distanceTime.distance / 1000 * perKmRate.motorcycle) + (distanceTime.time / 60 * perMinuteRate.motorcycle)) * 100) / 100
};

   return fare;
}
const createRide=async({
  user,pickup,destination,vehicleType
})=>{
  if(!user)throw new Error('user filed is required')
  if(!pickup)throw new Error('Pick up filed is required')
  if(!destination)throw new Error('destination filed is required')
  if(!vehicleType)throw new Error('Vehicle Type filed is requird')
    const fare=await getFare(pickup,destination);
  const ride=rideModel.create({
     user,
     pickup,
     destination,
     fare:fare[vehicleType]

  })
  return ride;
}
export {getFare,createRide}


