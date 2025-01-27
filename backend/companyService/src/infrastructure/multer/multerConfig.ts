import { S3Client } from '@aws-sdk/client-s3';
import multer, { Multer, StorageEngine } from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';
import { Request } from 'express';

dotenv.config();

// AWS S3 client setup
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

// Multer storage setup for S3
const storage: StorageEngine = multerS3({
  s3: s3,
  bucket: process.env.S3_BUCKET_NAME as string,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname });
  },
  key: (req: Request, file, cb) => {
    const folderName = req.body.folderName || 'defaultFolder';
    const uniqueSuffix = `${Date.now()}-${file.originalname}`;
    cb(null, `${folderName}/${uniqueSuffix}`);
  },
});

// Multer instance for handling file upload
export const upload: Multer = multer({ storage: storage, limits: { fileSize : 50 * 1024 * 1024, files: 6} });