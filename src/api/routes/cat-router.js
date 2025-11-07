import express from 'express';
import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat
} from '../controllers/cat-controller.js';

// Multer imports
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

// Cat router
const catRouter = express.Router();

// Testaus pääseekö routeriin
console.log('cat-routerissa ollaan');

// Upload image
catRouter.route('/').get(getCat).post(upload.single('file'), postCat);

//catRouter.route('/').get(getCat).post(postCat);

// Get cat by id
catRouter.route('/:id').get(getCatById).put(putCat).delete(deleteCat);

export default catRouter;
