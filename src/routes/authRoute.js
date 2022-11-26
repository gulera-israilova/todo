import Router from 'express';
import authController from '../controllers/authController.js';
import { registerValidation } from '../utils/validations.js';
import { handleValidationErrors } from '../utils/handleValidationErrors.js';

const authRoute = new Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the book
 *         username:
 *           type: string
 *           description: Username
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *         username: gulera
 *         password: password
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The auth managing API
 */

/**
 * @swagger
 * /auth/registration:
 *   post:
 *     summary: Create a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
authRoute.post('/registration', registerValidation, handleValidationErrors, authController.registration)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authorization
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
authRoute.post('/login', authController.login)

export default authRoute;