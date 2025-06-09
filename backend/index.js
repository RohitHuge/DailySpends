// index.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB, { pool } from './db/connectDB.js';

// Initialize Express app
dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Add pool to req object
app.use((req, res, next) => {
    req.pool = pool;
    next();
});

// Database connection
connectDB()
    .then(() => {
        console.log('✅ Database connected successfully')
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch(err => console.error('❌ Database connection error:', err.message));

import registrationRoutes from './routes.js';
// Routes
app.use('/api',registrationRoutes);

