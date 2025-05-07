import {  createContext, useContext, useState } from "react";
export const CaptianDataContext=createContext();


export const useCaptain=()=>{
    const context=useContext(CaptianDataContext);
    if(!context){
        throw new Error('useCaptain must be used within a CaptainProvider')
    }
    return context
}

const CaptainContext=({children})=>{
    const [captain, setCaptain ]= useState(null)
    const [isLoading,setIsLoading]=useState(false)
    const [error,setError]=useState(null);
    const updateCaptain=(captainData)=>{
        setCaptain(captainData)
    } 
    const value={
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain
    };
    return(
        <div>
        <CaptianDataContext.Provider value={value}>
              {children}
        </CaptianDataContext.Provider>
        </div>
    )


    };

    export default CaptainContext