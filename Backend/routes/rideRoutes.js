import {createRideController} from '../controllers/rideController.js';
import express from 'express'
import { body } from 'express-validator';
const router=express.Router();
import { authUser } from '../middleware/authMiddleware.js';
router.post('/create',
    body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid destination address'),
    body('vehicleType').isString().isLength({min:3}).isIn(['auto','car','motorcycle']).withMessage('Invalid  vehicleType'),
    authUser,createRideController
    
   

)


export  default router