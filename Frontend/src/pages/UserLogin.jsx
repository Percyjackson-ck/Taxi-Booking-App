import React, { useContext, useState } from 'react'
import Uber_logo from '../images/Uber_logo_.png'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'
const UserLogin = () => {
  const [email,setEmail]=  useState('');
  const [password,setPassword]=useState('');
  const[userData,setUserData]=useState({});

   const {user,setUser}=useContext(UserDataContext);
   const nagivate=useNavigate();

  const submitHandler = async (e) => {
  e.preventDefault();

  const UserData = {
    email: email,
    password: password
  };
//  alert(JSON.stringify(UserData));
try {
   const response = await axios.post(
  `${import.meta.env.VITE_BASE_URL}/users/login`,
  UserData,
   // <== Important for cookies!
);

    if (response.status === 200) {
      const data = response.data;
      console.log(data.user);

      setUser(data.user);
      localStorage.setItem('token', data.token);

      // alert('Login successful!');
      nagivate('/home');
    }
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    // alert(error.response?.data?.message || "Login failed. Please check your credentials.");
  }

  setEmail('');
  setPassword('');
};

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
         <div>
         <img  className='w-16 mb-10'   src={Uber_logo} alt="" />
        
        <form onSubmit={submitHandler} >
            <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input 
            className='bg-[#eeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
             required
             value={email}
              placeholder='Enter your email'/>

            <h3 className='text-lg font-medium mb-2'>Enter password</h3>
            <input
            className='bg-[#eeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
             type="password"
             value={password}
             onChange={(e)=>{
              setPassword(e.target.value)
             }}
            placeholder='Enter your password'/>
            <button
            className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-lg '>Login</button>
            <p className='text-center mb-4'>New here? 
            <Link to='/signup' className='text-blue-600'>Create new Account</Link>  </p>

        </form>
            
            </div>  
            <div>
           <Link 
           to='/captain-login'
              className='bg-[#10b461] flex justify-center items-center text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg '>Sign in as Captain</Link>                
                </div>           
    </div>
  )
}

export default UserLogin