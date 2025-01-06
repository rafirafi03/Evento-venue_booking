"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoURI = process.env.MONGO_URI;
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000,
            tlsAllowInvalidCertificates: false
        });
        console.log('mongodb connected');
    }
    catch (error) {
        console.log('mongodb connection error:', error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
