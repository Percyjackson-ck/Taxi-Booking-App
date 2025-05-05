import React, { useState } from 'react'
import Uber_logo from '../images/Uber_logo_.png'
import { Link } from 'react-router-dom'
const UserLogin = () => {
  const [email,setEmail]=  useState
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
         <div>
         <img  className='w-16 mb-10'   src={Uber_logo} alt="" />
        
        <form >
            <h3 className='text-lg font-medium mb-2'>What's your email</h3>
            <input 
            className='bg-[#eeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
             required
              placeholder='Enter your email'/>

            <h3 className='text-lg font-medium mb-2'>Enter password</h3>
            <input
            className='bg-[#eeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
             type="password"
            placeholder='Enter your password'/>
            <button
            className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base'>Login</button>
            <p className='text-center mb-4'>New here? 
            <Link to='/signup' className='text-blue-600'>Create new Account</Link>  </p>

        </form>
            
            </div>  
            <div>
           <button
              className='bg-[#10b461] text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'>Sign in as Captain</button>                
                </div>           
    </div>
  )
}

export default UserLogin