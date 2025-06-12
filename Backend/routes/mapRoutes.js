import express from 'express';
import { query } from 'express-validator';
import { authUser } from '../middleware/authMiddleware.js';
import {getCoordinates,getDistanceTime,getAutoCompleteSuggestions} from '../controllers/mapController.js';
const router = express.Router();

router.get(
  '/get-coordinates',
  authUser,
  [
    query('address')
      .isString()
      .notEmpty()
      .withMessage('Address query parameter is required'),
  ],
  getCoordinates // controller will handle validationResult
);
router.get('/get-distance-time',
  query('origin').isString().isLength({min:3}),
  query('destination').isString().isLength({min:3}),
  authUser,getDistanceTime
)


router.get('/get-suggestions',
  query('input').isString().isLength({min:3}),
  authUser,getAutoCompleteSuggestions
)
export default router