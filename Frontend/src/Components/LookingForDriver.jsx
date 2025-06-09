import React from 'react'

const LookingForDriver = (props) => {
  return (
       <div >
      <h5
      onClick={()=>{
        props.setVehicleFound(false);
      }}
     
      className='absolute top-0 w-[93%] text-center   '><i className=" text-3xl  text-gray-300 ri-arrow-down-wide-line p-10"></i></h5>
      <h3 className='text-xl font-bold  inline-block'>Looking for  a Driver</h3>
      <div className='flex flex-col  gap-2 justify-between items-center'>
        <img className='h-25 p-0 m-0' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
        <div className='w-full mt-5 '>
          <div className='flex items-center gap-5 p-3 border-b-2 border-gray-400 '>
            <i className=" text-lg ri-map-pin-user-fill"></i>
            <div >
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab,Bhopal</p>
            </div>

          </div>
          <div className='flex items-center gap-5  p-3 border-b-2 border-gray-400'>
            <i className=" text-lg ri-map-pin-2-fill"></i>
            <div >
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab,Bhopal</p>
            </div>
          </div>
          <div className='flex items-center gap-5  p-3'>
            <i className="ri-currency-line"></i>
            <div >
              <h3 className='text-lg font-medium'>₹193.20</h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LookingForDriver