import userModel from '../models/userModel.js'
import createUser from '../services/userServices.js'
import { validationResult } from 'express-validator'

const regitserUser=async(req,res,next)=>{
     const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }
  const { fullname, email, password } = req.body;
const { firstname, lastname } = fullname;

  const hashedPassword = await userModel.hashPassword(password);

  const user=await createUser({
    fullname,
    email,
    password:hashedPassword,

  });
  const token=user.generateAuthToken();
  res.status(201).json({token,user})


}
const loginUser=async(req,res,next)=>{
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
  res.status(200).json({token,user});
}

export {regitserUser,loginUser}