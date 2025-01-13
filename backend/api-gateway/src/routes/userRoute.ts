import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv'

dotenv.config()

export const userProxy = createProxyMiddleware({
  target: process.env.USER_SERVICE_URL || 'http://localhost/user',
  changeOrigin: true,
  pathRewrite: { '^/api/users': '' }
});
