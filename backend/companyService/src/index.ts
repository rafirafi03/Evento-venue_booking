import express from "express";
import morgan from 'morgan';
import logger from "./logger";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectDB } from "./infrastructure/db";
import  companyRoute from "./infrastructure/express/route";
import cookieParser from 'cookie-parser'
import { startGrpcVenueServer } from "./infrastructure/grpc/grpcServices/grpcVenueServer";
import mongoose from "mongoose";

const PORT = process.env.PORT;
const FRONTEND_PORT = process.env.FRONTEND_PORT;

const app = express();

connectDB();

app.use(
  cors({
    origin: FRONTEND_PORT,
    credentials: true,
  })
);

app.use(
  morgan('combined', {
    stream: {
      write: (message: string) => logger.info(message.trim()), 
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Company service is running')
});

app.use("/",companyRoute);
app.get('/health', async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState === 1 ? 'UP' : 'DOWN';

    res.status(200).json({
      status: 'UP',
      database: dbStatus,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';

    res.status(500).json({
      status: 'DOWN',
      database: 'DOWN',
      error: errorMessage,
      timestamp: new Date().toISOString(),
    });
  }
});

app.listen(PORT, () => {
  logger.info(`server is running on http://localhost:${PORT}`);
  startGrpcVenueServer()
});
