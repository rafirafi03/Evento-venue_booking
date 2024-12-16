import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io'
import { userProxy } from './routes/userRoute';
import { companyProxy } from './routes/companyRoute';
import { bookingProxy } from './routes/bookingRoute';
import { chatProxy } from './routes/chatRoute';
import { HttpMethod } from './constants/httpMethods';

import errorHandler from './middlewares/errorHandler';
import cors from 'cors';

dotenv.config();

const app = express();
const httpServer = createServer(app)
const PORT = process.env.PORT || 5000;
const frontendPort = process.env.FRONTEND_PORT

const io = new Server(httpServer, {
  cors: {
    origin: frontendPort, // Frontend origin
    methods: [HttpMethod.GET, HttpMethod.POST],
  },
});

const corsOptions = {
    origin: frontendPort,
    methods: [HttpMethod.GET, HttpMethod.POST, HttpMethod.PATCH, HttpMethod.DELETE], 
    credentials: true, 
};

// Apply CORS middleware
app.use(cors(corsOptions));

io.on('connection', (socket) => {
  console.log(`Gateway: User connected ${socket.id}`);

  // Forward events to chatService
  const chatSocket = require('socket.io-client')('http://localhost:4004');

  // Forward messages to chatService
  socket.on('sendMessage', (data) => {
    console.log('Gateway forwarding message:', data);
    chatSocket.emit('sendMessage', data);
  });

  // Forward messages from chatService back to the client
  chatSocket.on('receiveMessage', (data) => {
    console.log('Gateway received message from chatService:', data);
    socket.emit('receiveMessage', data);
  });

  socket.on('disconnect', () => {
    console.log(`Gateway: User disconnected ${socket.id}`);
    chatSocket.disconnect();
  });
});


// Apply proxies
app.use('/api/user', userProxy);
app.use('/api/company', companyProxy);
app.use('/api/booking', bookingProxy);
app.use('/api/chats', chatProxy);

app.get('/', (req, res) => {
    res.send('API Gateway is running')
});

// Global error handler
app.use(errorHandler);

httpServer.listen(PORT, () => {
  console.log(`API Gateway is running on http://localhost:${PORT}`);
});
