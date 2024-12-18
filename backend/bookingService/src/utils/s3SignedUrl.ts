import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';

dotenv.config()

const s3 = new S3Client({
  region: process.env.AWS_REGION, // Set the AWS region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export const generateSignedUrl = async (imageName: string): Promise<string> => {
  const bucketName = process.env.S3_BUCKET_NAME as string;
  const imageKey = imageName; // Path of the image in S3

  // Create a command to get the object
  const command = new GetObjectCommand({
    Bucket: bucketName, // The name of the bucket in S3
    Key: imageKey,      // The key (path) of the object in the bucket
  });

  // Generate the signed URL (valid for 1 hour)
  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return signedUrl;
};
