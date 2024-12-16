import dotenv from 'dotenv'

dotenv.config()

export const constructS3Url = (key: string): string => {
    return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  };