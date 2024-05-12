/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication Endpoints
 */

import { Router } from 'express';
import { login, changePassword } from '../controllers/auth.controller';

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in
 *     description: Log in with user credentials
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User authenticated successfully
 *       '401':
 *         description: Invalid credentials
 */
router.post('/login', login);

/**
 * @swagger
 * /auth/change-password:
 *   post:
 *     summary: Change Password
 *     description: Change password of authenticated user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password changed successfully
 *       '401':
 *         description: Could not change password due to invalid credentials
 */
router.post('/change-password', changePassword);

export default router;
