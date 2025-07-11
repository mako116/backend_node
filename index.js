import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRouthes.js';
import loanRoutes from './routes/loanRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import throttleMiddleware from './middlewares/throttleMiddleWare.js';

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(throttleMiddleware);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/loans', loanRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
