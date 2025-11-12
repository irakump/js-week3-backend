import express from 'express';
import {
  getCat,
  getCatById,
  getCatsByUserId,
  postCat,
  putCat,
  deleteCat,
  getMyCats
} from '../controllers/cat-controller.js';

// Multer imports
import multer from 'multer';
import {authenticateToken} from '../../middlewares/authentication.js'
const upload = multer({ dest: 'uploads/' });

// Cat router
const catRouter = express.Router();

// Upload image
catRouter.route('/').get(getCat).post(authenticateToken, upload.single('file'), postCat);

// Get own cats
catRouter.route('/user').get(authenticateToken, getMyCats);

// Get cats by user id (all cats owned by user) - someone else's cats
catRouter.route('/user/:id').get(authenticateToken, getCatsByUserId);

// Get cat by id
catRouter.route('/:id').get(getCatById).put(putCat).delete(deleteCat);

export default catRouter;
