import React from 'react'
import { Link } from 'react-router-dom'
import Uber_logo from '../images/Uber_logo_.png'

const CaptainHome = () => {
  return (
    <div className='h-screen'>
           <div className='fixed p-3 top-0  flex items-center justify-between w-full'>
                  <img className='w-16 ' src={Uber_logo} alt="" />
            
            <Link  to='/captain-home' className='  h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className="ri-logout-box-r-line"></i>
           </Link>
           </div>
            <div className='h-3/5'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />

            </div>
            <div className='h-2/5 p-6'>
            <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start gap-4'>
              <img className='h-10 w-10 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAtTx8gd2ORfj4uFdQ-3Ufkit0OgN8wZNziA&s" alt="" />
              <h4 className='text-lg font-medium'>Harsh Patel</h4>
              
            </div>
            <div>
              <h4 className='text-xl font-semibold'>₹295.20</h4>
              <p className='text-sm text-gray-600'>Earned</p>
              
              </div>
            </div>
            <div className='flex mt-8 p-3 bg-gray-200 rounded-xl justify-center items-center gap-5'>
              <div className='text-center'>
                <i className="text-3xl mb-2 font-thin ri-time-line"></i>
                <h5 className='text-lg font-medium'>10.2</h5>
                <p className='text-sm text-gray-600'>Hours Online</p>
              </div>
              <div className='text-center'>
                <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
                 <h5 className='text-lg font-medium'>10.2</h5>
                <p className='text-sm text-gray-600'>Hours Online</p>
              </div>
              <div className='text-center'>
                <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
                 <h5 className='text-lg font-medium'>10.2</h5>
                <p className='text-sm text-gray-600'>Hours Online</p>
              </div>
            </div>
            </div>

        </div>
  )
}

export default CaptainHome