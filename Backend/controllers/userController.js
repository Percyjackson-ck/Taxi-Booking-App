import userModel from '../models/userModel.js'
import createUser from '../services/userServices.js'
import { validationResult } from 'express-validator'
import blacklistTokenModel from '../models/blacklistTokenModel.js'
const registerUser=async(req,res,next)=>{
     const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }
  // console.log(req);
  
  const { fullname, email, password } = req.body;
const { firstname, lastname } = fullname;
const checkEmail=await userModel.findOne({email});
if(checkEmail){
  return res.status(400).json({message:"User already exits"})
}

  const hashedPassword = await userModel.hashPassword(password);

  const user=await createUser({
    fullname,
    email,
    password:hashedPassword,

  });
  // const token=user.generateAuthToken();
  res.status(201).json({token,user})


}
const loginUser=async(req,res,next)=>{
  console.log(req.email);
  
  const  errors=validationResult(req);
  if(!errors.isEmpty()){
   return res.status(400).json({errors:errors.array()})
  }
  const {email,password}=req.body;
  const user=await userModel.findOne({email}).select('+password');

  if(!user){
    return res.status(401).json({message:'Invaild email'})

  }
  const isMatch=await user.comparePassword(password);
  if(!isMatch){
    return res.status(401).json({message:'Invaild passowrd'})
  }
  const token=user.generateAuthToken();
  res.cookie('token',token,{
    httpOnly:true,
    secure:process.env.NODE_ENV==='production',
    maxAge:3600000
  })
  res.status(200).json({token,user});
}

const getuserProfile=async(req,res,next)=>{
    res.status(200).json(req.user);
}

const logoutUser=async(req,res,next)=>{
  const token=req.cookies.token || req.headers.authorization.split(' ')[1];
   res.clearCookie('token');
   await blacklistTokenModel.create({token});
   res.status(200).json({message:"Logged out"})
}
export {registerUser,loginUser,getuserProfile,logoutUser}