import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import productRoutes from './routes/productRoutes.js';
import saleRoutes from './routes/saleRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import customerRoutes from './routes/customerRoutes.js';


dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/paperolla')
  .then(() => console.log('MongoDB Connected Successfully for PaperOlla ERP'))
  .catch(err => console.error('Database connection error:', err));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/customers', customerRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('PaperOlla Backend Server Active & Running!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});