import captainModel from "../models/captainModel.js";
import { validationResult } from "express-validator";
import createCaptain from'../services/captainServices.js' 
import blacklistTokenModel from "../models/blacklistTokenModel.js";
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

const loginCaptain=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});

    }
    const {email,password}=req.body;
    const captain= await captainModel.findOne({email}).select('+password')
    if(!captain){
        return res.status(401).json({message:'Invalid email'})

    }
    const isMatch=await captain.comparePassword(password);
    if(!isMatch){
        res.status(401).jons({message:'Invalid password'})

    }
    const token=captain.generateToken();
    res.cookie('token',token);
    res.status(200).json({token,captain});
}


const getCaptainProfile=async(req,res)=>{
    res.status(200).json({captain:req.captain});
}

const logoutCaptain=async(req,res)=>{
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blacklistTokenModel.create({token});
    res.clearCookie('token')
    res.status(200).json({message:'Logout suncessfull'})
}
export {registerCaptain,loginCaptain,getCaptainProfile,logoutCaptain}