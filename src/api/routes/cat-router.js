import express from 'express';
import {
  getCat,
  getCatById,
  getCatsByUserId,
  postCat,
  putCat,
  deleteCat,
  getCatsByUserId,
  getMyCats
} from '../controllers/cat-controller.js';

// Multer imports
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

import {authenticateToken} from '../../middlewares/authentication.js'

// Cat router
const catRouter = express.Router();

// Upload image
catRouter.route('/').get(getCat).post(upload.single('file'), postCat);

// Post cat without image
// Get cats by user id (all cats owned by user)
catRouter.route('/user/:userId').get(getCatsByUserId).delete(deleteCat);

// Get own cats
catRouter.route('/user').get(authenticateToken, getMyCats());

// Get cats by user id (someone else's cats)
catRouter.route('/user/:id').get(getCatsByUserId);


// Get cat by id
catRouter.route('/:id').get(getCatById).put(putCat).delete(deleteCat);

export default catRouter;
