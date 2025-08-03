import { getAddressCoordinate,getDistanceAndTime} from "../services/mapServices.js";
import rideModel from "../models/rideModel.js"
import crypto from 'crypto'
import { sendMessageToSocketId } from "../socket.js";
async function getFare(pickup, destination) {
  if (!pickup) throw new Error('Pickup is required');
  if (!destination) throw new Error('Destination is required');
  // console.log(pickup);
  // console.log(destination);
  
  
const originCoordinates = await getAddressCoordinate(pickup);
const destinationCoordinates = await getAddressCoordinate(destination);
// console.log(originCoordinates);
// console.log(destinationCoordinates);


const originnew = `${originCoordinates.lat},${originCoordinates.lng}`;
const destinationnew = `${destinationCoordinates.lat},${destinationCoordinates.lng}`;

const distanceTime = await getDistanceAndTime(originnew, destinationnew);
  // console.log("📏 distance (km):", distanceTime.distance / 1000);
  // console.log("⏱ time (min):", distanceTime.time / 60);
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
  //  console.log(distanceTime.distance/1000);
   
  const fare = {
  auto: Math.round((baseFare.auto + ((distanceTime.distance / 1000) * perKmRate.auto) + ((distanceTime.time / 60) * perMinuteRate.auto)) * 100) / 100,
  car: Math.round((baseFare.car + ((distanceTime.distance / 1000) * perKmRate.car) + ((distanceTime.time / 60 )* perMinuteRate.car)) * 100) / 100,
  motorcycle: Math.round((baseFare.motorcycle + ((distanceTime.distance / 1000 )* perKmRate.motorcycle) + ((distanceTime.time / 60) * perMinuteRate.motorcycle)) * 100) / 100
};

   return fare;
}

function getOtp(num){
  const otp=crypto.randomInt(Math.pow(10,num-1),Math.pow(10,num)).toString();
  return otp;
  

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
     otp:getOtp(6),
     fare:fare[vehicleType]

  })
  return ride;
}
const confirmRideService=async({rideId,captain})=>{
 
    try {
    if (!rideId) {
      throw new Error('Ride is required');
    }

    await rideModel.findOneAndUpdate(
      { _id: rideId },
      {
        status: 'accepted',
        captain: captain._id,
      }
    );

    const ride = await rideModel
      .findOne({ _id: rideId })
      .populate('user')
      .populate('captain')  
      .select('+otp')

    if (!ride) {
      throw new Error('Ride not found');
    }

    return ride.save();
  } catch (err) {
    console.error("🚨 Error in confirmRideService:", err.message);
     throw err; 
}
}
const startrideServices=async({rideId,otp,captain})=>{
  if(!rideId  || !otp){
    throw new Error('Ride id and otp are required')
  }
  const ride=await rideModel.findOne({
    _id:rideId
  }).populate('user')  
  .populate('captain')  
  .select('+otp')
  if(!ride){
    throw new Error('Ride not found')
  }
  if(ride.status!="accepted"){
    throw new Error('Rode not Accepeted')
  }
  if(!ride.otp==otp){
    throw new Error('Invalid OTP')
  }
  await rideModel.findOneAndUpdate({
    _id:rideId
  },{
    status:'ongoing'
  })
  sendMessageToSocketId(rideId.user.socketId,{
    event:'ride-started',
    data:ride
  })
  return ride

}
export {getFare,createRide,confirmRideService,startrideServices}


