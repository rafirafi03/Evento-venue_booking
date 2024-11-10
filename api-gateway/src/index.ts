import express from 'express';
import dotenv from 'dotenv';
import { userProxy } from './routes/userRoute';
import { companyProxy } from './routes/companyRoute';
import { bookingProxy } from './routes/bookingRoute'

import errorHandler from './middlewares/errorHandler';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], 
    credentials: true, 
};

// Apply CORS middleware
app.use(cors(corsOptions));


// Apply proxies
app.use('/api/user', userProxy);
app.use('/api/company', companyProxy);
app.use('/api/booking', bookingProxy);
// app.use('/api/chats', chatProxy);

app.get('/', (req, res) => {
    res.send('API Gateway is running')
});

// Global error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API Gateway is running on http://localhost:${PORT}`);
});
