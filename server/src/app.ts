import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import uploadRoutes from './routes/uploadRoutes';
import orderRoutes from './routes/orderRoutes';
import chatRoutes from './routes/chatRoutes';
import { notFound, errorHandler } from './middleware/errorMiddleware';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        'http://localhost:5176',
        process.env.FRONTEND_URL || ''
    ],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/chat', chatRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
