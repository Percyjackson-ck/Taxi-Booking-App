import { createRide } from "../services/rideServices.js";
import { validationResult } from "express-validator";


const createRideController=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const{pickup,destination,vehicleType}=req.body;
    try{
        const ride=await createRide({user:req.user._id,pickup,destination,vehicleType});
        return res.status(201).json(ride);
    }catch(err){
        return res.status(400).json({message:err.message})
    }
}
export {createRideController}