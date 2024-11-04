"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoute_1 = require("./routes/userRoute");
const companyRoute_1 = require("./routes/companyRoute");
// import { bookingProxy } from './routes/bookingRoute';
// import { chatProxy } from './routes/chatRoute';
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Apply proxies
app.use('/api/user', userRoute_1.userProxy);
app.use('/api/company', companyRoute_1.companyProxy);
// app.use('/api/bookings', bookingProxy);
// app.use('/api/chats', chatProxy);
app.get('/', (req, res) => {
    res.send('API Gateway is running');
});
// Global error handler
app.use(errorHandler_1.default);
app.listen(PORT, () => {
    console.log(`API Gateway is running on http://localhost:${PORT}`);
});
