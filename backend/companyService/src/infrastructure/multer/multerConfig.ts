import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config()

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      resource_type: 'image',
      public_id: (req: any, file: any) => `${Date.now()}-${file.originalname}`,
      folder: 'copanyLicenses' as any, // Explicitly cast folder as any
    } as any, // This line ensures TypeScript won't check the params type
  });

export const upload = multer({ storage: storage });
