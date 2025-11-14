import express from 'express';
import {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';
import {body} from 'express-validator';
import {validationErrors} from '../../middlewares/error-handlers.js';

// User router
const userRouter = express.Router();

// Require token to get all users
//userRouter.route('/').get(authenticateToken, getUser).post(postUser);

// Get all users, require token and validate
userRouter.route('/').get(getUser).post(
    body('email').trim().isEmail(),
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('password').trim().isLength({min: 8}),
    validationErrors,
    postUser
  );

// Get user by id
userRouter.route('/:id').get(getUserById).put(putUser).delete(deleteUser);

export default userRouter;
