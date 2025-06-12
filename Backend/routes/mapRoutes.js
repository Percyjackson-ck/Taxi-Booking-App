import express from 'express';
import { query } from 'express-validator';
import { authUser } from '../middleware/authMiddleware.js';
import getCoordinates from '../controllers/mapController.js';
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

export default router