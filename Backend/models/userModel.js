import mongoose  from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'



const UserSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'First name must be at leats 3 characters long'],

        },
        lastname:{
            type:String,

        }
    },
    email:{
        type:String,
        required:true,
        minlength:[5,'Email must be  at least 5 characters long'],

    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    socketId:{
        type:String,
             
    },

})
//Generate Token
UserSchema.methods.generateAuthToken = function () {
    // this refers to the instance of the User document
    //when i use this i cannot use arrow funciton 
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
  };

//Compare password
  UserSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password)
  };

//Hash  password
  UserSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);  // Generate salt with 10 rounds
    return await bcrypt.hash(password, salt);  // Hash the password with the salt
  };
  
const userModel=mongoose.model('user',UserSchema)
export default userModel;