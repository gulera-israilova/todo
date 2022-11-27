import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
    credentials: {
        accessKeyId: 'AKIATXP2BXDQKUFMYCCG ',
        secretAccessKey: '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',
    },
    region: "us-east-1",
   });

export const upload = multer({
    storage: multerS3({
        acl: "public-read",
        s3,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        bucket: "wushubook",
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldName });
        },
        key: function (req, file, cb) {
            cb(null, file.originalname);
        },
    }),
});