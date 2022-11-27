import Router from 'express';
import fileUploadController from '../controllers/fileUploadController.js';
import { validateToken } from "../middlewares/authMiddleware.js";
import multer from "multer";
import {upload} from "../utils/fileService.js";

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
 *           description: The file was successfully upload
 *         500:
 *           description: Some server error
 */
fileUploadRoute.post('/upload', validateToken, upload.single('file'), fileUploadController.fileUpload);

export default fileUploadRoute;