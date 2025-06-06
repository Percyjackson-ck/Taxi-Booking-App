import React, { useRef, useState } from 'react'
import Uber_logo from '../images/Uber_logo_.png'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../Components/LocationSearchPanel.jsx'



const Home = () => {

  const [pickup, setPickUp] = useState('')
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false)
  
  
  const panelRef = useRef(null)
  const panelCloseRef=useRef(null)
  
  const submitHandler = (e) => {
    e.preventDefault();
  }

  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding:24
        // opacity:1
      })
      gsap.to(panelCloseRef.current,{
         opacity:'1'

      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        padding:0,
        // opacity:0
      })
       gsap.to(panelCloseRef.current,{
         opacity:'0'
      })
    }
  }, [panelOpen])
  return (
    <div className='h-screen relative   overflow-hidden' >
      <img className='w-16 absolute left-5 top-5' src={Uber_logo} alt="" />
      <div className='h-screen w-screen'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>


      <div className='  w-full flex flex-col justify-end absolute h-screen top-0 left-0 right-0 '>

        <div className='h-[30%] bg-white  p-5 relative'>

          <h5 ref={panelCloseRef} onClick={() => {
            setPanelOpen(false)
          }} className='absolute opacity-0 right-6 top-6 text-2xl'><i className="ri-arrow-down-wide-line"></i></h5>
          <h4 className='text-2xl font-semibold'>Find Trip</h4>
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <div className="line absolute h-16 w-[2px] top-[45%] left-10 bg-gray-900 rounded-full"></div>
            <input
              onClick={(e) => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickUp(e.target.value)}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5' type="text" placeholder='Add a pick-up location' />


            <input
              onClick={(e) => setPanelOpen(true)}

              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3' type="text" placeholder='Enter your Destination' />
          </form>
        </div>
        <div ref={panelRef} className=' bg-white  h-0'>
          <LocationSearchPanel/>

        </div>
      </div>
      <div className='fixed w-full z-10 bg-white bottom-0 px-3 py-6  '>
        <h3 className='text-xxl font-semibold mb-5'>Choose A Vehicle</h3>
        <div className='flex border-2  mb-2 active:border-black   rounded-2xl p-3 items-center justify-between'>
          <img className='h-10 ' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
          <div className='-ml-2 w-1/2' >
            <h4 className='font-medium text-base'>Uber Go <span><i className="ri-user-fill"></i>4</span></h4>
            <h5  className='font-medium text-sm'>2 min away</h5>
            <p  className='font-medium text-xs text-gray-600'>Affordable Compact rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹193.20</h2>
        </div>
        <div className='flex border-2  mb-2 active:border-black  rounded-2xl p-3 items-center justify-between'>
          <img className='h-10  ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
          <div className='-ml-2 w-1/2' >
            <h4 className='font-medium text-base'> Moto <span><i className="ri-user-fill"></i>1</span></h4>
            <h5  className='font-medium text-sm'>3 min away</h5>
            <p  className='font-medium text-xs text-gray-600'>Affordable Motor cycle ride</p>
          </div>
          <h2 className='text-lg font-semibold'>₹64.20</h2>
        </div>
        <div className='flex border-2  mb-2  active:border-black   rounded-2xl p-3 items-center justify-between'>
          <img className='h-10  ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsFabRnJZ8deGXJSKA1QjN45920WytRrdFsA&s" alt="" />
          <div className='-ml-2 w-1/2' >
            <h4 className='font-medium text-base'>Uber Auto  <span><i className="ri-user-fill"></i>3</span></h4>
            <h5  className='font-medium text-sm'>10 min away</h5>
            <p  className='font-medium text-xs text-gray-600'>Affordable Auto ride</p>
          </div>
          <h2 className='text-lg font-semibold'>₹120.20</h2>
        </div>
      </div>
    </div>
  )
}

export default Home