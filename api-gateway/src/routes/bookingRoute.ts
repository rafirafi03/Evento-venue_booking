import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv'

dotenv.config()

export const bookingProxy = createProxyMiddleware({
  target: process.env.BOOKING_SERVICE_URL || 'http://localhost:4003',
  changeOrigin: true,
  pathRewrite: { '^/api/bookings': '' }
});
