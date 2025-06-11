import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import resumeRoutes from './routes/resumeRoutes.js';
import {v2 as cloudinary} from 'cloudinary'

const app = express();
dotenv.config();

app.use(
  cors({
    origin:process.env.CLIENT_URL || "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(express.json());
app.use(cookieParser())

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));