import express from 'express';
import {getMe, postLogin} from '../controllers/auth-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';

const authRouter = express.Router();

// Login
authRouter.route('/login').post(postLogin);

// Get me
authRouter.route('/me').post(authenticateToken, getMe);

export default authRouter;
