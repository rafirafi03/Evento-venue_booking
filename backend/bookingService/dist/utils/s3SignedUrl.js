"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSignedUrl = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const s3 = new client_s3_1.S3Client({
    region: process.env.AWS_REGION, // Set the AWS region
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const generateSignedUrl = async (imageName) => {
    const bucketName = process.env.S3_BUCKET_NAME;
    const imageKey = imageName; // Path of the image in S3
    // Create a command to get the object
    const command = new client_s3_1.GetObjectCommand({
        Bucket: bucketName, // The name of the bucket in S3
        Key: imageKey, // The key (path) of the object in the bucket
    });
    // Generate the signed URL (valid for 1 hour)
    const signedUrl = await (0, s3_request_presigner_1.getSignedUrl)(s3, command, { expiresIn: 3600 });
    return signedUrl;
};
exports.generateSignedUrl = generateSignedUrl;
