import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv'

dotenv.config()

export const chatProxy = createProxyMiddleware({
  target: process.env.CHAT_SERVICE_URL || 'http://localhost:4004',
  changeOrigin: true,
  pathRewrite: { '^/api/chats': '' }
});
