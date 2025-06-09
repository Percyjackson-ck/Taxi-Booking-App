import React, { useRef, useState } from 'react'
import Uber_logo from '../images/Uber_logo_.png'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../Components/LocationSearchPanel.jsx'
import VehiclePanel from '../Components/VehiclePanel.jsx'
import  ConfirmRide from '../Components/ConfirmRide.jsx'
import WaitingForDriver from '../Components/WaitingForDriver.jsx'
import LookingForDriver from '../Components/LookingForDriver.jsx'
const Home = () => {
  const [pickup, setPickUp] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef=useRef(null)
  const vehicleFoundRef=useRef(null)
  const waitingForDriverRef=useRef(null)


  const[vehiclePanelOpen,setVehiclePanelOpen]=useState(false);
  const[confirmRidePanel,setConfirmRidePanel]=useState(false);

  const[vehicleFound,setVehicleFound]=useState(false);
  const confirmRideRef=useRef(null);
  const [waitingForDriverPanel,setWaitingForDriverPanel]=useState(false)

  const submitHandler = (e) => {
    e.preventDefault();
  }

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 24
      });
      gsap.to(panelCloseRef.current, {
        opacity: '1'
      });
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0
      });
      gsap.to(panelCloseRef.current, {
        opacity: '0'
      });
    }
  }, [panelOpen]);
   
 useGSAP(() => {
  if(vehiclePanelOpen){
    gsap.to(vehiclePanelRef.current, {
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  } else {
    gsap.to(vehiclePanelRef.current, {
      y: "100%",
      duration: 0.5,
      ease: "power2.in"
    });
  }
}, [vehiclePanelOpen]);


 useGSAP(() => {
  if(confirmRidePanel){
    gsap.to(confirmRideRef.current, {
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  } else {
    gsap.to(confirmRideRef.current, {
      y: "100%",
      duration: 0.5,
      ease: "power2.in"
    });
  }
}, [confirmRidePanel]);

 useGSAP(() => {
  if(vehicleFound){
    gsap.to(vehicleFoundRef.current, {
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  } else {
    gsap.to(vehicleFoundRef.current, {
      y: "100%",
      duration: 0.5,
      ease: "power2.in"
    });
  }
}, [vehicleFound]);


useGSAP(() => {
  if(waitingForDriverPanel){
    gsap.to(waitingForDriverRef.current, {
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  } else {
    gsap.to(waitingForDriverRef.current, {
      y: "100%",
      duration: 0.5,
      ease: "power2.in"
    });
  }
}, [waitingForDriverPanel]);




  return (
    <div className='h-screen relative overflow-hidden  '>
      <img className='w-16 absolute left-5 top-5' src={Uber_logo} alt="" />
      <div
      className='h-screen w-screen'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>

      <div className='w-full flex flex-col justify-end absolute h-screen top-0 left-0 right-0'>
        <div className='h-[30%] bg-white p-5 relative'>
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className='absolute opacity-0 right-6 top-6 text-2xl'
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find Trip</h4>
          <form onSubmit={submitHandler}>
            <div className="line absolute h-16 w-[2px] top-[45%] left-10 bg-gray-900 rounded-full"></div>
            <input
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickUp(e.target.value)}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5'
              type="text"
              placeholder='Add a pick-up location'
            />
            <input
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3'
              type="text"
              placeholder='Enter your Destination'
            />
          </form>
        </div>

        <div ref={panelRef} className='bg-white h-0'>
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen} />
        </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed w-full z-10  translate-y-full  bg-white bottom-0 px-3 py-8 pt-12'>
        <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanelOpen={setVehiclePanelOpen} />

      </div>
      <div ref={confirmRideRef} className='fixed w-full z-10  translate-y-full  bg-white bottom-0 px-3 py-8 pt-12'>
        <ConfirmRide   setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />

      </div>
       <div ref={vehicleFoundRef}className='fixed w-full z-10  translate-y-full  bg-white bottom-0 px-3 py-8 pt-12'>
       <LookingForDriver setVehicleFound={setVehicleFound}/>
      </div>

       <div  ref={waitingForDriverRef} className='fixed w-full z-10 translate-y-full   bg-white bottom-0 px-3 py-8 pt-12'>
       <WaitingForDriver setWaitingForDriverPanel={setWaitingForDriverPanel}  />
      </div>
    </div>
  );
};

export default Home;
