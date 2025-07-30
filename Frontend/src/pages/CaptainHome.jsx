import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import Uber_logo from '../images/Uber_logo_.png'
import CaptainDetails from '../Components/CaptainDetails'
import RidePopUp from '../Components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../Components/ConfirmRidePopUp'
import { useCaptain } from '../context/CaptainContext'
import { SocketContext } from '../context/SocketContext'
import axios from 'axios'


const CaptainHome = () => {

  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const RidePopUpPanelRef = useRef(null);

  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const ConfirmRidePopUpRef = useRef(null);
  const [ride, setRide] = useState({});
  const { socket } = useContext(SocketContext)
  const { captain } = useCaptain();

  useEffect(() => {
    if (socket && captain?._id) {
      socket.emit('join', { userType: "captain", userId: captain._id })
    }
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })
      }
    }
    updateLocation();
    const locationInterval = setInterval(updateLocation, 10000)
    return () => clearInterval(locationInterval)


  }, [socket, captain?._id])
  socket.on('new-ride', (data) => {
    // console.log(data);
    setRide(data)
    setRidePopUpPanel(true);

  })
  async function confirmRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: ride._id,
      captain: captain,

    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    setRidePopUpPanel(false);
    setConfirmRidePopUpPanel(true)
  }

  useGSAP(() => {
    if (ridePopUpPanel) {
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
    if (confirmRidePopUpPanel) {
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
      <div ref={RidePopUpPanelRef} className='fixed w-full z-10  translate-y-full  bg-white bottom-0 px-3 py-8 pt-12'>
        <RidePopUp

          ride={ride}
          confirmRide={confirmRide}
          setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} />
      </div>
      <div ref={ConfirmRidePopUpRef} className='fixed w-full z-10  translate-y-full  bg-white h-screen bottom-0 px-3 py-8 pt-12'>
        <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} 
        confirmRide={confirmRide} setRidePopUpPanel={setRidePopUpPanel} />
      </div>

    </div>
  )
}

export default CaptainHome