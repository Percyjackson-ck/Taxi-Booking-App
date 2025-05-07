import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCaptain } from '../context/CaptainContext';
import axios from 'axios';

const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const nagivate=useNavigate();
  const {captain,setCaptain}=useCaptain();
  const [isLoading,setIsLoading]=useState(true);
 useEffect(()=>{
    if (!token) {
        nagivate('/login')
      }
 },[token])

 axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
  headers:{
    Authorization: `Bearer ${token}` 
  }
 })
 .then((respone)=>{
  if(respone.status==200){
    const data=respone.data;
    setCaptain(data.user)
    setIsLoading(false);
  }
 }).catch((err)=>{
  console.log(err);
  localStorage.removeItem('token');
  nagivate('/login')
  
 })
  if(isLoading){
    return(
      <div>Loading....</div>
    )

  }

  return <>{children}</>;
};

export default UserProtectedWrapper;
