import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()


export const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI as string;
        console.log(mongoURI,"mongouriiii")

        console.log(typeof mongoURI, 'mongouriiii')
        if (!mongoURI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
          }
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