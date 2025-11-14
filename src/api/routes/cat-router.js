import express from 'express';
import {
  getCat,
  getCatById,
  getCatsByUserId,
  postCat,
  putCat,
  deleteCat,
  getMyCats,
} from '../controllers/cat-controller.js';
import {upload} from '../../middlewares/upload.js';
import {body} from 'express-validator';

// Multer imports
import {authenticateToken} from '../../middlewares/authentication.js';
import { validationErrors } from '../../middlewares/error-handlers.js';

// Cat router
const catRouter = express.Router();

// Upload new cat with image with validation rules and sanitation, e.g. name must be 3-128 digits.
// File needs to be uploaded before validation rules so body exists.
catRouter
  .route('/')
  .get(getCat)
  .post(
    authenticateToken,
    upload.single('file'),
    body('cat_name').trim().isLength({min: 3, max: 128}).escape(),
    body('weight').trim().isNumeric().toFloat(),
    body('owner').trim().isInt(),
    body('birthdate').trim().isDate,
    validationErrors,
    postCat
  ); // use upload from upload.js, validate cat input

// Get own cats
catRouter.route('/user').get(authenticateToken, getMyCats);

// Get cats by user id (all cats owned by user) - someone else's cats
catRouter.route('/user/:id').get(authenticateToken, getCatsByUserId);

// Get cat by id
catRouter.route('/:id').get(getCatById).put(putCat).delete(deleteCat);

export default catRouter;
