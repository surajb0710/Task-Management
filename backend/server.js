const express = require('express');
const multer = require('multer');
const cloudinary = require('./cloudinaryConfig');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    if (file.size > 5 * 1024 * 1024)
      return res.status(400).json({ error: 'File size must be under 5MB' });

    const result = await cloudinary.uploader
      .upload_stream(
        { resource_type: 'image', folder: 'task-manager' },
        (error, uploadResult) => {
          if (error) return res.status(500).json({ error: 'Upload failed' });
          res.json({ imageUrl: uploadResult.secure_url });
        }
      )
      .end(file.buffer);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
