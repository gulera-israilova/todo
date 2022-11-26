import Router from 'express';
import { upload } from '../utils/fileService.js';
import fileUploadController from '../controllers/fileUploadController.js';
import { validateToken } from "../middlewares/authMiddleware.js";

const fileUploadRoute = new Router();

/**
 * @swagger
 * tags:
 *   name: File upload
 *   description: The file upload managing API
 */

/**
 * @swagger
 *
 *   /file/upload:
 *     post:
 *       summary: Upload file
 *       security:
 *       - bearerAuth: []
 *       tags: [File upload]
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 file:
 *                   type: string
 *                   format: binary
 *       responses:
 *         200:
 *           $ref: '#/components/responses/NoContent'
 *         401:
 *           $ref: '#/components/responses/UnauthorizedError'
 *         500:
 *           $ref: '#/components/responses/UnexpectedError'
 */
fileUploadRoute.post('/upload', validateToken, upload.single('file'),fileUploadController.fileUpload);

export default fileUploadRoute;