import mongoose from "mongoose";


const rideSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    captian:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'captainModel',
    },
    pickup:{
        type:String,
        required:true,
    },
    destination:{
        type:String,
        required:true,
    },
    fare:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
       enum: ['pending', 'accepted', 'ongoing','completed', 'cancelled'],
       default:'pending',
    },
    duration:{
        type:Number,
       //In seconds
    },
    distance:{
        type:Number,
        //In meters
    },
    paymentId:{
        type:String,

    },
    orderId:{
        type:String,
    },
    signature:{
        type:String,
    },


})

const rideModel=mongoose.model('ride',rideSchema)
export default rideModel