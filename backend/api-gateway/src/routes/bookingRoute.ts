import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv'

dotenv.config()

export const bookingProxy = createProxyMiddleware({
  target: process.env.BOOKING_SERVICE_URL || 'http://localhost/booking',
  changeOrigin: true,
  pathRewrite: { '^/api/bookings': '' }
});
