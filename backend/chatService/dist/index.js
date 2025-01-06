"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("./logger"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./infrastructure/db");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const route_1 = __importDefault(require("./infrastructure/express/route"));
const mongoose_1 = __importDefault(require("mongoose"));
const socket_io_1 = require("./infrastructure/services/socket-io");
const PORT = process.env.PORT;
const FRONTEND_PORT = process.env.FRONTEND_PORT;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const httpServer = (0, http_1.createServer)(app);
(0, db_1.connectDB)();
(0, socket_io_1.initializeSocket)(httpServer);
app.use((0, cors_1.default)({
    origin: `http://localhost:${FRONTEND_PORT}`,
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
app.get('/health', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbStatus = mongoose_1.default.connection.readyState === 1 ? 'UP' : 'DOWN';
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
}));
httpServer.listen(PORT, () => {
    logger_1.default.info(`server is running on http://localhost:${PORT}`);
});
