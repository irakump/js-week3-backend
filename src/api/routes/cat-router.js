import express from 'express';
import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

// Cat router
const catRouter = express.Router();

// Get all cats
catRouter.route('/').get(getCat).post(postCat);

// Get cat by id
catRouter.route('/:id').get(getCatById).put(putCat).delete(deleteCat);

export default catRouter;
