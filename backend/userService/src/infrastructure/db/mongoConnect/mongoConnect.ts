import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

const mongoURI = process.env.mongo_URI as string
console.log(mongoURI,"mongouri in consoleeee")

export const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000,
            tlsAllowInvalidCertificates: false
        })
        console.log('mongodb connected');
        
    } catch (error) {
        console.log('mongodb connection error:', error);
        process.exit(1)
        
    }
}