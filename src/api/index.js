import express from 'express';
import catRouter from './routes/cat-router.js'; // pitää olla .js-pääte
import userRouter from './routes/user-router.js';

// Mini express sovellus
const router = express.Router();


// bind base url for all cat routes to catRouter
router.use('/cats', catRouter);


// bind base url for all user routes to userRouter
router.use('/users', userRouter);

// Export one router
export default router;
