import { getAddressCoordinate, getCaptainInTheRadius } from "../services/mapServices.js";
import { createRide, getFare, confirmRideService, startrideServices } from "../services/rideServices.js";
import { ExpressValidator, validationResult } from "express-validator";
// import { Socket } from "socket.io";
import { sendMessageToSocketId } from '../socket.js'
import rideModel from "../models/rideModel.js";
const createRideController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination, vehicleType } = req.body;
    try {
        const ride = await createRide({ user: req.user._id, pickup, destination, vehicleType });
        const pickupCorrdinates = await getAddressCoordinate(pickup)
        // console.log("user location ",pickupCorrdinates);


        const captainsInRadius = await getCaptainInTheRadius(pickupCorrdinates.lat, pickupCorrdinates.lng, 40)
        // console.log(captainsInRadius);
        ride.otp = ""
        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user')
        captainsInRadius.map(captain => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })
        })
        res.status(201).json(ride);

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}
const getFareController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array })
    }
    const { pickup, destination } = req.query;
    try {
        const fare = await getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

const confirmRide = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })

    }


    const { rideId, captain } = req.body;
    if (!captain || !captain._id) {
        return res.status(400).json({ message: "Captain info is missing or invalid" });
    }

    try {
        const ride = await confirmRideService({ rideId, captain })

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })
        return res.status(200).json(ride);
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const startride = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { rideId, otp } = req.query;
    try {
        const ride = await startrideServices({ rideId, otp, captain: req.captain })
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })
        return res.status(200).json(ride)

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}
export { createRideController, getFareController, confirmRide, startride }