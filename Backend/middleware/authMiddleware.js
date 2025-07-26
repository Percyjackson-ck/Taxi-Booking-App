import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import blacklistTokenModel from "../models/blacklistTokenModel.js";
import captainModel from '../models/captainModel.js';


const authUser=async(req,res,next)=>{
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    // console.log(token);
    
  if(!token){
    return res.status(401).json({message:'Unathorized'})
  }
  const isBlacklisted=await blacklistTokenModel.findOne({token:token});
  if(isBlacklisted){
    return res.status(401).json({message:'Unauthorized'});
  }
  try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    req.user=await userModel.findById(decoded._id).select('-password');
    next();
  }catch(err){
    console.log("Invalid token or expired", err);
    return res.status(401).json({message:'Unauthorized Acess'})
    

  }
}
const authCaptain=async(req,res,next)=>{
  // console.log(req.headers.authorization);
  
  const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
  if(!token){
    return res.status(401).json({message:'Not authorized,no token'})
  }
  const isBlacklisted=await blacklistTokenModel.findOne({token:token})
  if(isBlacklisted){
    return res.status(401).json({message:'Unauthorized'})

  }
  try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    const captain=await captainModel.findById(decoded._id)
    req.captain=captain;
    next();
  }catch(err){
    res.status(401).json({message:'Unauthorized'});
  }

}
export { authUser,authCaptain};