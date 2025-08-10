import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Uber_logo from '../images/Uber_logo_.png'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import FinishRide from '../Components/FinishRide'

const CaptainRiding = () => {
    const [finishRidePanel,setFinishRidePanel]=useState(false)
    const finishRidePanelRef=useRef(null);
    const location=useLocation();
    const rideData=location.state?.ride
  
     useGSAP(() => {
  if(finishRidePanel){
    gsap.to(finishRidePanelRef.current, {
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  } else {
    gsap.to(finishRidePanelRef.current, {
      y: "100%",
      duration: 0.5,
      ease: "power2.in"
    });
  }
}, [finishRidePanel]);
    
    return (


        <div className='h-screen'>
          
            <div className='fixed p-3 top-0  flex items-center justify-between w-full'>
                <img className='w-16 ' src={Uber_logo} alt="" />

                <Link to='/captain-home' className='  h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className='h-4/5'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />

            </div>
            <div
            onClick={()=>{
                setFinishRidePanel(true);
            }}
            
            className='h-1/5 p-6 bg-yellow-400 relative flex justify-between items-center'>
              <h5 className='absolute top-0 w-[70%]  text-center   '>
                <i className=" text-3xl  text-gray-700 ri-arrow-down-wide-line p-10"></i></h5>
                <h4 className='ml-2 text-xl font-semibold'>4 Km away</h4>
                <button className=' ml-7 font-semibold p-3 px-10 rounded-lg bg-green-600 text-white'>Complete Ride</button>

            </div>
             <div  ref={finishRidePanelRef} className='fixed w-full z-10  translate-y-full  bg-white h-[85%] bottom-0 px-3 py-8 pt-12'>
           <FinishRide 
           
           ride={rideData}
           setFinishRidePanel={setFinishRidePanel}/>
      </div>
        </div>



    )
}

export default CaptainRiding