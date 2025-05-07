import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCaptain } from '../context/CaptainContext';
import axios from 'axios';

const CaptainProtectedWrapper = ({ children }) => {
    const nagivate=useNavigate();
    const token = localStorage.getItem('token')
    const {captain,setCaptain}=useCaptain();
    const {error,setError}=useCaptain();
    const [isLoading,setIsLoading]=useState(true);
    useEffect(() => {
        if (!token) {
       nagivate('/captain-login')
        }
    },[token])

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
        headers:{
            Authorization:`Bearer ${token}`
        }

    }).then((response)=>{
        if(response.status==200){
            const data=response.data;
            setCaptain(data.captain)
           setIsLoading(false);
        }
    }).catch((err)=>{
        console.log(err);
        localStorage.removeItem('token')
        nagivate('/captain-login')
        
    })
   

    if(isLoading){
        return(
            <div>Loading....</div>
        )
    }
    return (
        <>
        {children}
        </>
    )
}

export default CaptainProtectedWrapper