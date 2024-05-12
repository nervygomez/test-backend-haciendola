/**
 * @swagger
 * tags:
 *   name: Routes
 *   description: Main endpoints of the API
 */

import { Router } from 'express';
import authRoute from './auth.route';
import userRoute from './user.route';
import productRoute from './product.route';

const router = Router();

/**
 * @swagger
 * /auth:
 *   description: Routes related to authentication
 *   tags: [Routes]
 */
router.use('/auth', authRoute);

/**
 * @swagger
 * /user:
 *   description: Routes related to users
 *   tags: [Routes]
 */
router.use('/user', userRoute);

/**
 * @swagger
 * /product:
 *   description: Routes related to products
 *   tags: [Routes]
 */
router.use('/product', productRoute);

export default router;
