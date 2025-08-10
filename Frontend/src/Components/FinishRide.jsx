import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const FinishRide = (props) => {
    // console.log(props?.ride);
    const nagivate=useNavigate();
    async function endRide() {
        const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,{
            rideId:props.ride._id
        },{
            headers:{
                Authorization:`bearer ${localStorage.getItem('token')}`
            }
        })
        if(response.status==200){
            props.setFinishRidePanel(false)
            nagivate('/captain-home')
        }
    }
    return (
        <div className='' >

            <h5
                onClick={() => {
                   props.setFinishRidePanel(false)
                }}
                className='absolute top-0 w-[93%] text-center   '><i className=" text-3xl  text-gray-300 ri-arrow-down-wide-line p-10"></i></h5>
            <h3 className='text-xl font-bold  inline-block'>Finish this Ride</h3>
            <div className='flex items-center justify-between p-2 bg-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3'>
                    <img className='h-12 w-10 rounded-full object-cover' src="https://i.pinimg.com/736x/cb/33/d8/cb33d80fe655e221ae05f41c8edd0cdb.jpg" alt="" />
                    <h2 className='text-lg font-medium white'>{props.ride?.user?.fullname.firstname}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>
            <div className='flex flex-col  gap-2 justify-between items-center'>
                <div className='w-full mt-5 '>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-400 '>
                        <i className=" text-lg ri-map-pin-user-fill"></i>
                        <div >
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                        </div>

                    </div>
                    <div className='flex items-center gap-5  p-3 border-b-2 border-gray-400'>
                        <i className=" text-lg ri-map-pin-2-fill"></i>
                        <div >
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5  p-3'>
                        <i className="ri-currency-line"></i>
                        <div >
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>



                <div className='mt-6  w-full'>





                    <button
                        onClick={endRide}
                        className='block text-center mt-5 w-full bg-green-600 text-white font-semibold p-3 rounded-lg text-lg'>
                       Finish Ride
                    </button>
                    <p className=' mt-6 text-xs'>click on finish ride button  if you have compeleted the payment</p>



                </div>
            </div>

        </div>
    )
}

export default FinishRide