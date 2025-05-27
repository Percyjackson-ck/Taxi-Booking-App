import captainModel from "../models/captainModel.js";
import { validationResult } from "express-validator";
import createCaptain from'../services/captainServices.js' 
import blacklistTokenModel from "../models/blacklistTokenModel.js";
const registerCaptain=async(req,res)=>{
//    console.log(req);
   
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
        res.status(401).json({message:'Invalid password'})

    }
    const token=captain.generateToken();
    res.cookie('token',token);
    res.status(200).json({token,captain});
}


const getCaptainProfile=async(req,res)=>{
    res.status(200).json({captain:req.captain});
}

const logoutCaptain = async (req, res) => {
    try {
      // Log the request object to check its contents (useful for debugging)
      // console.log(req.headers.authorization);
      
      // Get the token from cookies or authorization header
      const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(400).json({ message: 'Token not provided' });
      }
      
      // Blacklist the token
      await blacklistTokenModel.create({ token });
      
      // Clear the token from cookies
      res.clearCookie('token');
      
      // Send the success response
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      // Handle any errors that occur
    //   console.error(error);
      res.status(500).json({ message: 'Something went wrong, please try again later' });
    }
  };
  
export {registerCaptain,loginCaptain,getCaptainProfile,logoutCaptain}