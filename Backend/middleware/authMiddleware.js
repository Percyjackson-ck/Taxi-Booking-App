import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import blacklistTokenModel from "../models/blacklistTokenmodel.js";


const authUser=async(req,res,next)=>{
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    // cons ole.log(token);
    
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
export default authUser;