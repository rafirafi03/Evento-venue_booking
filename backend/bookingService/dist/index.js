"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("./logger"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./infrastructure/db");
const route_1 = __importDefault(require("./infrastructure/express/route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const PORT = process.env.PORT;
const app = (0, express_1.default)();
(0, db_1.connectDB)();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use((0, morgan_1.default)('combined', {
    stream: {
        write: (message) => logger_1.default.info(message.trim()),
    },
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use("/", route_1.default);
app.get('/health', async (req, res) => {
    try {
        let dbStatus = mongoose_1.default.connection.readyState === 1 ? 'UP' : 'DOWN';
        res.status(200).json({
            status: 'UP',
            database: dbStatus,
            timestamp: new Date().toISOString(),
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'DOWN',
            database: 'DOWN',
            error: error.message,
            timestamp: new Date().toISOString(),
        });
    }
});
app.listen(PORT, () => {
    logger_1.default.info(`server is running on http://localhost:${PORT}`);
    // startGrpcBookingServer()
});
