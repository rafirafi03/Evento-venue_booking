import mongoose from 'mongoose';
require('dotenv').config()

const mongoURI = process.env.mongo_URI as string

export const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI)
        console.log('mongodb connected');
        
    } catch (error) {
        console.log('mongodb connection error:', error);
        process.exit(1)
        
    }
}