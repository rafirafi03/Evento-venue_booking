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
    params: async (req: any, file: any) => {
      const folderName = req.body.folderName || 'defaultFolder';
      return {
        folder: folderName,
        resource_type: 'image',
        public_id: `${Date.now()}-${file.originalname}`,
      };
    },
  });

  export const upload = multer({ storage: storage });
