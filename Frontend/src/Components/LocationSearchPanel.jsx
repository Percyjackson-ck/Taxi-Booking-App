import axios from 'axios';
import React, { useState } from 'react';

const LocationSearchPanel = ({
   pickupSuggestions,
  destinationSuggestions,
  setVehiclePanelOpen,
  setPanelOpen,
  setPickup,
  setDestination,
  pickup,
  destination,
  activeField,
  setFare
}) => {

  
 const[loading,setLoading]=useState(false)
  const currentSuggestions = activeField === "pickup" ? pickupSuggestions : destinationSuggestions;

  const handleSuggestionClick = (suggestion) => {
    if (!suggestion?.name) return;

    if (activeField === 'pickup') {
      setPickup(suggestion.name);
    } else if (activeField === 'destination') {
      setDestination(suggestion.name);
    }
  };

  // ✅ Checks if a name is present in the suggestion list
  const isNameValid = (name) => {
    return Array.isArray(suggestions) && suggestions.some((item) => item.name === name);
  };

 const handleContinueClick =async () => {
  const isPickupValid =
    Array.isArray(pickupSuggestions) &&
    pickupSuggestions.some(item => item.name === pickup);

  const isDestinationValid =
    Array.isArray(destinationSuggestions) &&
    destinationSuggestions.some(item => item.name === destination);

  if (!pickup || !destination) {
    alert("Please select both pickup and destination.");
    return;
  }

  if (!isPickupValid || !isDestinationValid) {
    alert("Please select valid locations from suggestions.");
    return;
  }
  setLoading(true);
  try{
    const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`,{
      params:{
        pickup:pickup,
        destination:destination
      },
       headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    // console.log(response);
    
      if (response?.data) {
      setFare(response.data);
    } else {
      alert("Failed to retrieve fare.");
      return;
    }
     setPanelOpen(false);
  setVehiclePanelOpen(true);
    
  }catch (err) {
    alert("Error while fetching fare");
  } finally {
    setLoading(false); // Hide loading whether success or error
  }

 
};


  return (
    <div className="px-2 py-4">
    {loading ? (
  <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-70 flex items-center justify-center z-50">
    <div className="animate-spin h-10 w-10 border-4 border-black border-t-transparent rounded-full"></div>
  </div>
) : (
  <button
    onClick={handleContinueClick}
    className="mb-4 w-full bg-black text-white py-2 rounded-lg font-semibold"
  >
    Find Trip
  </button>
)}

      <div className="max-h-80 overflow-y-auto scroll-smooth custom-scroll">
        {Array.isArray(currentSuggestions) && currentSuggestions.length > 0 ? (
          currentSuggestions.map((elem, idx) => (
            <div
              key={idx}
              onClick={() => handleSuggestionClick(elem)}
              className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start cursor-pointer"
            >
              <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
                <i className="ri-map-pin-fill"></i>
              </h2>
              <h4 className="font-medium">{elem.name}</h4>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No suggestions found.</p>
        )}
      </div>
    </div>
  );
};

export default LocationSearchPanel;
