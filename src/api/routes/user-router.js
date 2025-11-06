import express from 'express';
import { getUser, getUserById, postUser, putUser, deleteUser } from '../controllers/user-controller.js';

// User router
const userRouter = express.Router();

// Testaus pääseekö routeriin
console.log('user-routerissa ollaan');


// Get all users
userRouter.route('/').get(getUser).post(postUser);

// Get cat by id
userRouter.route('/:id').get(getUserById).put(putUser).delete(deleteUser);

export default userRouter;
