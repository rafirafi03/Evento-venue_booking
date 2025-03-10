import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

const mongoURL = process.env.MONGO_URL as string

export const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL, {
            serverSelectionTimeoutMS: 5000,
            tlsAllowInvalidCertificates: false
        })
        console.log('mongodb connected');
        
    } catch (error) {
        console.log('mongodb connection error:', error);
        process.exit(1)
        
    }
}