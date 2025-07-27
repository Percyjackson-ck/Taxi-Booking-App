import React from 'react'

const RidePopUp = (props) => {
    return (
        <div>

            <h5
            onClick={()=>{
                props.setRidePopUpPanel(false)
            }}
                className='absolute top-0 w-[93%] text-center   '><i className=" text-3xl  text-gray-300 ri-arrow-down-wide-line p-10"></i></h5>
            <h3 className='text-xl font-bold  inline-block'>New Ride Avaliable</h3>
            <div className='flex items-center justify-between p-2 bg-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3'>
                    <img className='h-12 w-10 rounded-full object-cover' src="https://i.pinimg.com/736x/cb/33/d8/cb33d80fe655e221ae05f41c8edd0cdb.jpg" alt="" />
                    <h2 className='text-lg font-medium'>{props.ride?.user?.fullname?.firstname+" " +props.ride?.user?.fullname?.lastname}</h2>
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
                <button
                  onClick={()=>{
                                      props.setRidePopUpPanel(false);
                    props.setConfirmRidePopUpPanel(true);
                  }}

                    className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Accept</button>
                <button
                   
                  onClick={()=>{
                    props.setRidePopUpPanel(false)
                    props.confirmRide()
                  }}
                    className='w-full mt-1 bg-gray-300 text-gray-600 font-semibold p-2 rounded-lg'>Ignore</button>
            </div>

        </div>
    )
}

export default RidePopUp