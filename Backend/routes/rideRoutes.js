import {createRideController, getFareController,startride} from '../controllers/rideController.js';
import express from 'express'
import { body, query } from 'express-validator';
const router=express.Router();
import { authCaptain, authUser } from '../middleware/authMiddleware.js';
import {confirmRide} from '../controllers/rideController.js'
router.post('/create',
    body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid destination address'),
    body('vehicleType').isString().isLength({min:3}).isIn(['auto','car','motorcycle']).withMessage('Invalid  vehicleType'),
    authUser,createRideController
    
   

)
router.get('/get-fare',
    query('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({min:3}).withMessage('Invalid destination address'),
    authUser,
    getFareController
)

router.post(
  '/confirm',
  
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride ID'),
  
  confirmRide
);
router.get('/start-ride',
  authCaptain,
  query('rideId').isMongoId().withMessage('Invalid ride id'),
  query('otp').isString().isLength({min:6,max:6}).withMessage('Invalid otp'),
  startride
)

export  default router