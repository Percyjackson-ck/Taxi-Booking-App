import { getAddressCoordinate, getCaptainInTheRadius } from "../services/mapServices.js";
import { createRide, getFare } from "../services/rideServices.js";
import { validationResult } from "express-validator";
// import { Socket } from "socket.io";

const createRideController=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const{pickup,destination,vehicleType}=req.body;
    try{
        const ride=await createRide({user:req.user._id,pickup,destination,vehicleType});
        const pickupCorrdinates=await getAddressCoordinate(pickup)
        console.log("user location ",pickupCorrdinates);
        
        
        const captainsInRadius=await  getCaptainInTheRadius(pickupCorrdinates.lat,pickupCorrdinates.lng,2)
        console.log(captainsInRadius);
        res.status(201).json(ride);
        
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}
const getFareController=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array})
    }
    const {pickup,destination}=req.query;
    try{
        const fare= await getFare(pickup,destination);
        return res.status(200).json(fare);
    }catch(err){
        return res.status(400).json({message:err.message})
    }
}
export {createRideController,getFareController}