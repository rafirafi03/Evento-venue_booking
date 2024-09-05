import mongoose from 'mongoose';
require('dotenv').config()

const mongoURI = process.env.MONGO_URI as string

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