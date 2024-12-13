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

const app = express();

connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
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

app.use("/",companyRoute);
app.get('/health', async (req, res) => {
  let dbStatus = 'DOWN';

  // Check database connection
  if (mongoose.connection.readyState === 1) {
    dbStatus = 'UP';
  }

  res.status(200).json({
    status: 'UP',
    database: dbStatus,
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  logger.info(`server is running on http://localhost:${PORT}`);
  startGrpcVenueServer()
});
