import React, { useContext, useState } from 'react'
import Uber_logo from '../images/Uber_logo_.png'
import { Link ,useNavigate} from 'react-router-dom'
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'
const UserSignup = () => {


  const[firstName,setFirstName]=useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});
  const nagivate=useNavigate();
  const {user,setUser}=useContext(UserDataContext);
  const submitHandler = async(e) => {
    e.preventDefault();


   const newUser={
      fullname:{
        firstname:firstName,
        lastname:lastName
      },
      email: email,
      password: password
  
  
   }

   const respone=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser);
  //  console.log(respone);
   
  if(respone.status==201){
    const data=respone.data
    setUser(data.user)
    localStorage.setItem('token',data.token)

    nagivate('/home')
  }
   
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src={Uber_logo} alt="" />

        <form onSubmit={submitHandler} >


          <h3 className='text-lg font-medium mb-2'>What's your name</h3>
          <div className='flex gap-4 mb-6'>
            <input
              className='bg-[#eeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              value={firstName}
              onChange={(e)=>{
                setFirstName(e.target.value)
              }}
              placeholder='First name' />
            <input
              className='bg-[#eeee]  w-1/2  rounded px-4 py-2 border  text-lg placeholder:text-base'
              type="text"
           value={lastName}
           onChange={(e)=>{
            setLastName(e.target.value)
           }}
              placeholder='Last name' />
          </div>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            className='bg-[#eeee] mb-6  w-full rounded px-4 py-2 border  text-lg placeholder:text-base'
            type="email"
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
             required
             value={email}
            placeholder='Enter your email' />

          <h3 className='text-lg font-medium mb-2'>Enter password</h3>
          <input
            className='bg-[#eeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password"
             value={password}
             onChange={(e)=>{
              setPassword(e.target.value)
             }}
            placeholder='Enter your password' />
          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-base '>Create Account</button>
         

        </form>
         <p className='text-center mb-4'>Already have a account?
            <Link to='/login' className='text-blue-600'>Login in here</Link>  </p>

      </div>
      <div>
        <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Private Policy</span>
        <span className='underline'>Terms of Service apply </span>
                 
        </p>
      </div>
    </div>
  )
}



export default UserSignup