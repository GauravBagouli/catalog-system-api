// server.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

dotenv.config();
import "./data/connection/connection";
import "./data/loadModels";

import productRoutes from './routes/product';
import variantRoutes from './routes/variant';
import addonRoutes from './routes/addon';


const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Health check
app.get('/server/health', (req: Request, res: Response) => {
  res.json({ success: true, message: 'Catalog API running fine 🚀' });
});

// Routes
app.use('/api/product',    productRoutes);
app.use('/api/variant',    variantRoutes);
app.use('/api/addon',      addonRoutes);

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server is live at port:${PORT}`);
});
