import functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Firebase Function API
export const api = functions.https.onRequest(app);
