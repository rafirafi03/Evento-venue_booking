"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoute_1 = require("./routes/userRoute");
const companyRoute_1 = require("./routes/companyRoute");
const bookingRoute_1 = require("./routes/bookingRoute");
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
};
// Apply CORS middleware
app.use((0, cors_1.default)(corsOptions));
// Apply proxies
app.use('/api/user', userRoute_1.userProxy);
app.use('/api/company', companyRoute_1.companyProxy);
app.use('/api/booking', bookingRoute_1.bookingProxy);
// app.use('/api/chats', chatProxy);
app.get('/', (req, res) => {
    res.send('API Gateway is running');
});
// Global error handler
app.use(errorHandler_1.default);
app.listen(PORT, () => {
    console.log(`API Gateway is running on http://localhost:${PORT}`);
});
