"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatProxy = void 0;
const http_proxy_middleware_1 = require("http-proxy-middleware");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.chatProxy = (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: process.env.CHAT_SERVICE_URL || 'http://localhost:4004',
    changeOrigin: true,
    pathRewrite: { '^/api/chats': '' }
});
