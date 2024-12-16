import express from "express";
import { createServer } from 'http';
import { Server } from 'socket.io';
import morgan from 'morgan';
import logger from "./logger";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectDB } from "./infrastructure/db";
import cookieParser from 'cookie-parser'
import chatRoute from './infrastructure/express/route';
import mongoose from "mongoose";
import { HttpMethod } from "./constants";

const PORT = process.env.PORT;

const app = express();
const httpServer = createServer(app);
connectDB();

const io = new Server(httpServer, {
  cors: {
    origin: '*', // Allow connections from the API Gateway
    methods: [HttpMethod.GET, HttpMethod.POST],
  },
});

io.on('connection', (socket) => {
  console.log(`ChatService: User connected ${socket.id}`);

  socket.on('sendMessage', (data) => {
    console.log('ChatService received message:', data);
    io.emit('receiveMessage', data); // Broadcast message
  });

  socket.on('disconnect', () => {
    console.log(`ChatService: User disconnected ${socket.id}`);
  });
});

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

app.use("/",chatRoute);
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
