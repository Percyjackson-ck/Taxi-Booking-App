import React, { useContext, useEffect, useRef, useState } from 'react'
import Uber_logo from '../images/Uber_logo_.png'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import axios from 'axios'

import LocationSearchPanel from '../Components/LocationSearchPanel.jsx'
import VehiclePanel from '../Components/VehiclePanel.jsx'
import ConfirmRide from '../Components/ConfirmRide.jsx'
import WaitingForDriver from '../Components/WaitingForDriver.jsx'
import LookingForDriver from '../Components/LookingForDriver.jsx'
import { SocketContext } from '../context/SocketContext.jsx'
import { UserDataContext } from '../context/UserContext.jsx'
import { useNavigate } from 'react-router-dom'
const Home = () => {

  const [pickup, setPickUp] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const confirmRideRef = useRef(null);

  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);

  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState('');
  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)
  //  console.log(user);
  const navigate=useNavigate();
  const [ride,setRide]=useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    if (socket && user?._id) {
          // console.log("Frontend socket ID:", socket.id); //
      socket.emit("join", { userType: "user", userId: user._id });
    }

  }, [socket, user?._id]);
  
  socket.on('ride-confirmed', (data) => {
    // console.log(data);
    setWaitingForDriverPanel(true);

    setVehicleFound(false)
    setRide(data)
    // console.log(ride);
    
  })


  const handlePickupChange = async (e) => {
    const value = e.target.value;
    setPickUp(value);

    if (value.length < 3) {
      setPickupSuggestions([]);
      return;
    }

    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPickupSuggestions(res.data);
    } catch (err) {
      console.error('Error getting pickup suggestions:', err);
    }
  };

  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    setDestination(value);

    if (value.length < 3) {
      setDestinationSuggestions([]);
      return;
    }

    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setDestinationSuggestions(res.data);
    } catch (err) {
      console.error('Error getting destination suggestions:', err);
    }
  };
  async function createRide(type) {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {

        pickup,
        destination,
        vehicleType: type,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      //  console.log(response?.data);

      return response.data


    }
    catch (err) {
      console.error("Ride creation failed:", err.response?.data || err.message);


    }

  }
  socket.on('ride-started',(ride)=>{
    setWaitingForDriverPanel(false)
    navigate('/riding',{state:{ride}})

  })

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, { height: '70%', padding: 24 });
      gsap.to(panelCloseRef.current, { opacity: '1' });
    } else {
      gsap.to(panelRef.current, { height: '0%', padding: 0 });
      gsap.to(panelCloseRef.current, { opacity: '0' });
    }
  }, [panelOpen]);

  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, {
      y: vehiclePanelOpen ? 0 : "100%",
      duration: 0.5,
      ease: "power2.out"
    });
  }, [vehiclePanelOpen]);

  useGSAP(() => {
    gsap.to(confirmRideRef.current, {
      y: confirmRidePanel ? 0 : "100%",
      duration: 0.5,
      ease: "power2.out"
    });
  }, [confirmRidePanel]);

  useGSAP(() => {
    gsap.to(vehicleFoundRef.current, {
      y: vehicleFound ? 0 : "100%",
      duration: 0.5,
      ease: "power2.out"
    });
  }, [vehicleFound]);

  useGSAP(() => {
    gsap.to(waitingForDriverRef.current, {
      y: waitingForDriverPanel ? 0 : "100%",
      duration: 0.5,
      ease: "power2.out"
    });
  }, [waitingForDriverPanel]);

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src={Uber_logo} alt="" />
      <div className='h-screen w-screen'>
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
              onClick={() => {
                setPanelOpen(true);
                setActiveField('pickup');
              }}
              value={pickup}
              onChange={handlePickupChange}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5'
              type="text"
              placeholder='Add a pick-up location'
            />
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField('destination');
              }}
              value={destination}
              onChange={handleDestinationChange}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3'
              type="text"
              placeholder='Enter your Destination'
            />
          </form>
        </div>

        <div ref={panelRef} className='bg-white h-0 overflow-hidden'>
          <LocationSearchPanel
            pickupSuggestions={pickupSuggestions}
            destinationSuggestions={destinationSuggestions}
            setVehiclePanelOpen={setVehiclePanelOpen}
            setPanelOpen={setPanelOpen}
            setPickup={setPickUp}
            setDestination={setDestination}
            pickup={pickup}
            destination={destination}
            activeField={activeField}
            setFare={setFare}
          />

        </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed w-full z-10 translate-y-full bg-white bottom-0 px-3 py-8 pt-12'>
        <VehiclePanel
          setVehicleType={setVehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanelOpen={setVehiclePanelOpen}
          fare={fare}
        />
      </div>

      <div ref={confirmRideRef} className='fixed w-full z-10 translate-y-full bg-white bottom-0 px-3 py-8 pt-12'>
        <ConfirmRide
          setConfirmRidePanel={setConfirmRidePanel}
          vehicleType={vehicleType}
          setVehicleFound={setVehicleFound}
          fare={fare}
          pickup={pickup}
          destination={destination}
          createRide={createRide}
        //  passenger={passenger}
        />
      </div>

      <div ref={vehicleFoundRef} className='fixed w-full z-10 translate-y-full bg-white bottom-0 px-3 py-8 pt-12'>
        <LookingForDriver
          setVehicleFound={setVehicleFound}
          vehicleType={vehicleType}
          fare={fare}
          pickup={pickup}
          destination={destination}
          createRide={createRide}

        />
      </div>

      <div ref={waitingForDriverRef} className='fixed w-full z-10 translate-y-full bg-white bottom-0 px-3 py-8 pt-12'>
        <WaitingForDriver
        ride={ride}
        setWaitingForDriverPanel={setWaitingForDriverPanel} />
      </div>
    </div>
  );
};

export default Home;
