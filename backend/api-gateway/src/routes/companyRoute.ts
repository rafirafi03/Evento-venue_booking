import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv'

dotenv.config()

export const companyProxy = createProxyMiddleware({
  target: process.env.COMPANY_SERVICE_URL || 'http://localhost/company',
  changeOrigin: true,
});
