import captainModel from "../models/captainModel.js";
import { validationResult } from "express-validator";
import createCaptain from'../services/captainServices.js' 
const registerCaptain=async(req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {fullname,email,password,vehicle}=req.body
   const isCaptainExists=await captainModel.findOne({email})

   if(isCaptainExists){
    return res.status(401).json({message:"Captain already exists"})
   }
    const hashedPassword=await captainModel.hashPassword(password)
    const captain=await createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
        
    });
    const token= captain.generateToken();
    res.status(201).json({token,captain});




}




export {registerCaptain}