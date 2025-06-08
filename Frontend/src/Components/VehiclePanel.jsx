import React from 'react'
import { useState } from 'react';
const VehiclePanel = (props) => {
      const [selectedVehicle, setSelectedVehicle] = useState(null);
    
  return (
    <div>



        <h3 className='text-xxl font-semibold mb-5 inline-block'>Choose A Vehicle</h3>
         
         <h5
         onClick={()=>{
          props.setVehiclePanelOpen(false)
         }} 
          className='absolute top-0 w-[93%] text-center p-1  '><i className=" text-3xl  text-gray-300 ri-arrow-down-wide-line p-10"></i></h5>
        <div
          onClick={() => setSelectedVehicle('uber-go')}
          className={`flex border-2 mb-2 rounded-2xl p-3 items-center justify-between cursor-pointer ${selectedVehicle === 'uber-go' ? 'border-black' : 'border-gray-300'
            }`}
        >
          <img className='h-10' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
          <div className='-ml-2 w-1/2'>
            <h4 className='font-medium text-base'>Uber Go <span><i className="ri-user-fill"></i> 4</span></h4>
            <h5 className='font-medium text-sm'>2 min away</h5>
            <p className='font-medium text-xs text-gray-600'>Affordable Compact rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹193.20</h2>
        </div>

        <div
          onClick={() => setSelectedVehicle('moto')}
          className={`flex border-2 mb-2 rounded-2xl p-3 items-center justify-between cursor-pointer ${selectedVehicle === 'moto' ? 'border-black' : 'border-gray-300'
            }`}
        >
          <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
          <div className='-ml-2 w-1/2'>
            <h4 className='font-medium text-base'>Moto <span><i className="ri-user-fill"></i> 1</span></h4>
            <h5 className='font-medium text-sm'>3 min away</h5>
            <p className='font-medium text-xs text-gray-600'>Affordable Motor cycle ride</p>
          </div>
          <h2 className='text-lg font-semibold'>₹64.20</h2>
        </div>

        <div
          onClick={() => setSelectedVehicle('auto')}
          className={`flex border-2 mb-2 rounded-2xl p-3 items-center justify-between cursor-pointer ${selectedVehicle === 'auto' ? 'border-black' : 'border-gray-300'
            }`}
        >
          <img className='h-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsFabRnJZ8deGXJSKA1QjN45920WytRrdFsA&s" alt="" />
          <div className='-ml-2 w-1/2'>
            <h4 className='font-medium text-base'>Uber Auto <span><i className="ri-user-fill"></i> 3</span></h4>
            <h5 className='font-medium text-sm'>10 min away</h5>
            <p className='font-medium text-xs text-gray-600'>Affordable Auto ride</p>
          </div>
          <h2 className='text-lg font-semibold'>₹120.20</h2>
        </div>



    </div>
  )
}

export default VehiclePanel