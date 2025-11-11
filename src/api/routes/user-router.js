import express from 'express';
import { getUser, getUserById, postUser, putUser, deleteUser } from '../controllers/user-controller.js';
import { authenticateToken } from '../../middlewares/authentication.js';

// User router
const userRouter = express.Router();

// Get all users
//userRouter.route('/').get(getUser).post(postUser);

// Require token to get all users
userRouter.route('/').get(authenticateToken, getUser).post(postUser);

// Get user by id
userRouter.route('/:id').get(getUserById).put(putUser).delete(deleteUser);

export default userRouter;
