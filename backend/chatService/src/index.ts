import express from "express";
import { createServer } from 'http';
import morgan from 'morgan';
import logger from "./logger";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectDB } from "./infrastructure/db";
import cookieParser from 'cookie-parser'
import chatRoute from './infrastructure/express/route';
import mongoose from "mongoose";
import { initializeSocket } from "./infrastructure/services/socket-io";

const PORT = process.env.PORT;
const FRONTEND_PORT = process.env.FRONTEND_PORT

const app = express();
app.use(cors())
const httpServer = createServer(app);
connectDB();

initializeSocket(httpServer)


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

app.use("/",chatRoute);
app.get('/', (req, res) => {
  res.send('chat server is running')
})
app.get('/health', async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState === 1 ? 'UP' : 'DOWN';

    res.status(200).json({
      status: 'UP',
      database: dbStatus,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'DOWN',
      database: 'DOWN',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

httpServer.listen(PORT, () => {
  logger.info(`server is running on http://localhost:${PORT}`);
});
