import React from 'react'

const CaptainDetails = () => {
  return (
    <div>
        
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
  )
}

export default CaptainDetails