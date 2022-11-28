import {upload} from '../utils/fileUploadToS3.js';
import Router from 'express';

const fileUploadRoute = new Router();
const singleUpload = upload.single("file");

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
 *       summary: Upload file to AWS S3 bucket
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
fileUploadRoute.post("/upload", function (req, res) {

    singleUpload(req, res, function (err) {
        if (err) {
            return res.json({
                success: false,
                errors: {
                    title: "File Upload Error",
                    detail: err.message,
                    error: err,
                },
            });
        }
        return res.json({
            fileURI:`${req.file.location}`

        })
    });
});

export default fileUploadRoute;