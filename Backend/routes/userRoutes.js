import express from 'express'
import {body} from 'express-validator'
import {registerUser,loginUser,getuserProfile,logoutUser } from '../controllers/userController.js';
import authUser from '../middleware/authMiddleware.js';
const router=express.Router();

router.post('/register',
    [ body('email').isEmail().withMessage('Invalid Email')
    ,body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 character long')
    ,body('password').isLength({min:6}).withMessage('Password must be at least 6 character long')
    
    ],registerUser)

router.post('/login',
    [body('email').isEmail().withMessage("Invalid Email"),
        body('password').isLength({mid:6}).withMessage('Password must be at least 6 character long ')

],loginUser)


router.get('/profile',authUser,getuserProfile)
router.get('/logout',authUser,logoutUser)
export  default router
