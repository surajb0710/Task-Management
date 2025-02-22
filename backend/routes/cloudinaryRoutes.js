require('dotenv').config();
const express = require('express');
const cloudinary = require('cloudinary').v2;
const router = express.Router();

// 🔹 Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🔹 API route to generate the Cloudinary signature
router.post('/generate-signature', (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  // Generate signature
  const signature = cloudinary.utils.api_sign_request(
    { timestamp },
    process.env.CLOUDINARY_API_SECRET
  );

  res.json({ timestamp, signature, apiKey: process.env.CLOUDINARY_API_KEY });
});

module.exports = router;
