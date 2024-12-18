"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
// import { Server } from 'socket.io'
const userRoute_1 = require("./routes/userRoute");
const companyRoute_1 = require("./routes/companyRoute");
const bookingRoute_1 = require("./routes/bookingRoute");
const chatRoute_1 = require("./routes/chatRoute");
const httpMethods_1 = require("./constants/httpMethods");
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const PORT = process.env.PORT || 5000;
const frontendPort = process.env.FRONTEND_PORT;
// const io = new Server(httpServer, {
//   cors: {
//     origin: frontendPort, // Frontend origin
//     methods: [HttpMethod.GET, HttpMethod.POST],
//   },
// });
const corsOptions = {
    origin: frontendPort,
    methods: [httpMethods_1.HttpMethod.GET, httpMethods_1.HttpMethod.POST, httpMethods_1.HttpMethod.PATCH, httpMethods_1.HttpMethod.DELETE],
    credentials: true,
};
// Apply CORS middleware
app.use((0, cors_1.default)(corsOptions));
// io.on('connection', (socket) => {
//   console.log(`Gateway: User connected ${socket.id}`);
//   // Forward events to chatService
//   const chatSocket = require('socket.io-client')('http://localhost:4004');
//   // Forward messages to chatService
//   socket.on('sendMessage', (data) => {
//     console.log('Gateway forwarding message:', data);
//     chatSocket.emit('sendMessage', data);
//   });
//   // Forward messages from chatService back to the client
//   chatSocket.on('receiveMessage', (data) => {
//     console.log('Gateway received message from chatService:', data);
//     socket.emit('receiveMessage', data);
//   });
//   socket.on('disconnect', () => {
//     console.log(`Gateway: User disconnected ${socket.id}`);
//     chatSocket.disconnect();
//   });
// });
// Apply proxies
app.use('/api/user', userRoute_1.userProxy);
app.use('/api/company', companyRoute_1.companyProxy);
app.use('/api/booking', bookingRoute_1.bookingProxy);
app.use('/api/chat', chatRoute_1.chatProxy);
app.get('/', (req, res) => {
    res.send('API Gateway is running');
});
// Global error handler
app.use(errorHandler_1.default);
app.listen(PORT, () => {
    console.log(`API Gateway is running on http://localhost:${PORT}`);
});
