import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Uber_logo from '../images/Uber_logo_.png'
import CaptainDetails from '../Components/CaptainDetails'
import RidePopUp from '../Components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../Components/ConfirmRidePopUp'
const CaptainHome = () => {

  const [ridePopUpPanel,setRidePopUpPanel] = useState(true);
  const  RidePopUpPanelRef=useRef(null);

  const[confirmRidePopUpPanel,setConfirmRidePopUpPanel]=useState(false);
  const ConfirmRidePopUpRef=useRef(null); 

  useGSAP(() => {
  if(ridePopUpPanel){
    gsap.to(RidePopUpPanelRef.current, {
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  } else {
    gsap.to(RidePopUpPanelRef.current, {
      y: "100%",
      duration: 0.5,
      ease: "power2.in"
    });
  }
}, [ridePopUpPanel]);

  useGSAP(() => {
  if(confirmRidePopUpPanel){
    gsap.to(ConfirmRidePopUpRef.current, {
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  } else {
    gsap.to(ConfirmRidePopUpRef.current, {
      y: "100%",
      duration: 0.5,
      ease: "power2.in"
    });
  }
}, [confirmRidePopUpPanel]);

  return (
    <div className='h-screen'>
      <div className='fixed p-3 top-0  flex items-center justify-between w-full'>
        <img className='w-16 ' src={Uber_logo} alt="" />

        <Link to='/captain-home' className='  h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='h-3/5'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />

      </div>
      <div className='h-2/5 p-6'>
        <CaptainDetails />
      </div>
      <div  ref={RidePopUpPanelRef} className='fixed w-full z-10  translate-y-full  bg-white bottom-0 px-3 py-8 pt-12'>
           <RidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}/>
      </div>
      <div  ref={ConfirmRidePopUpRef} className='fixed w-full z-10  translate-y-full  bg-white h-screen bottom-0 px-3 py-8 pt-12'>
           <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel}/>
      </div>

    </div>
  )
}

export default CaptainHome