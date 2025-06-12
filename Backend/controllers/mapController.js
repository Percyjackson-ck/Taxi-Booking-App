import { getAddressCoordinate,getDistanceAndTime, getSuggestions } from "../services/mapServices.js";
import { validationResult } from "express-validator";
const getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;
  try {
    const coordinates = await getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (err) {
    res.status(500).json({ message: 'Coordinates not found 404' });
  }
};
 const getDistanceTime = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { origin, destination } = req.query;

  if (!origin || !destination) {
    return res.status(400).json({ error: "Origin and destination are required" });
  }

  const [origLat, origLng] = origin.split(',').map(Number);
  const [destLat, destLng] = destination.split(',').map(Number);

  if ([origLat, origLng, destLat, destLng].some(isNaN)) {
    return res.status(400).json({ error: "Invalid coordinates format. Use 'lat,lng'" });
  }

  try {
    const result = await getDistanceAndTime(
      { lat: origLat, lng: origLng },
      { lat: destLat, lng: destLng }
    );

    res.status(200).json({
      success: true,
      distanceInMeters: result.distance,
      timeInSeconds: result.time,
    });
  } catch (error) {
    console.error("Error fetching distance/time:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAutoCompleteSuggestions=async(req,res)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()){
       return res.status(400).json({ errors: errors.array() });

  }
  const {input}=req.query;
  if(!input){
    return res.status(400).json({ error: "Invalid coordinates format. Use 'lat,lng'" });

  }
  try{
    const result=await getSuggestions(input)
    res.status(200).json(result)
  }catch(err){
  console.log('Error fetching the sugesstions');
  res.status(400).json({message:'Internal server error'})
  
  }
}
export {getCoordinates,getDistanceTime,getAutoCompleteSuggestions};
