import React from 'react'

const LocationSearchPanel = (props) => {
    const locations=["24B,Near kappor's cafe,Sheryains Coding School,Bhipol",
        "22c,Near malhotlra's cafe,Sheryains Coding School,Bhipol",
        "20B,Near Sighai's cafe,Sheryains Coding School,Bhipol"
        ,"18A,Near Sharmas's cafe,Sheryains Coding School,Bhipol"
    ]
    
  return (
    <div>
        {
            locations.map(function(elem,idx){
                return  <div key={idx} onClick={()=>{
                    props.setVehiclePanelOpen(true)
                    props.setPanelOpen(false)
                }} className='flex border-2 px-2 rounded-xl items-center my-2 justify-start  border-white  active:border-black'>
        <h2 className='bg-[#eee] flex items-center justify-center h-10 w-10 mr-3   rounded-full'><i className="ri-map-pin-fill"></i></h2>
        <h4 className='font-medium'>{elem}</h4>
    </div>
            })}

</div>
   
  )
}

export default LocationSearchPanel