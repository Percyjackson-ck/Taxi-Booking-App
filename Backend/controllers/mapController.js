import { getAddressCoordinate } from "../services/mapServices.js";
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

export default getCoordinates;
