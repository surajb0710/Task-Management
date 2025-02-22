import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload({ setSelectedImages }) {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);

  const uploadImage = async (event) => {
    const files = Array.from(event.target.files);
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    if (!files.length) return;
    setUploading(true);

    const uploadedImages = [];
    for (const file of files) {
      if (file.size > maxFileSize) {
        alert(`File ${file.name} exceeds 5MB limit.`);
        continue;
      }
      if (!file.type.startsWith('image/')) {
        alert(`File ${file.name} is not an image.`);
        continue;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'task_manager');

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
          }/image/upload`, // Replace with your Cloudinary cloud name
          {
            method: 'POST',
            body: formData,
          }
        );
        const data = await response.json();

        const imageUrl = data.secure_url;
        uploadedImages.push(imageUrl);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }

    setImages((prev) => [
      ...prev.filter((img) => img), // Remove empty strings if present
      ...uploadedImages.map((imageUrl) => ({
        mediaType: 'image',
        mediaUrl: imageUrl,
      })),
    ]);
    setUploading(false);
  };

  useEffect(() => {
    setSelectedImages((prev) => (prev !== images ? images : prev));
  }, [images, setSelectedImages]);

  return (
    <div>
      <Button
        component="label"
        variant="contained"
        startIcon={
          uploading ? <CircularProgress size={20} /> : <CloudUploadIcon />
        }
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload files'}
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          multiple
          onChange={uploadImage}
        />
      </Button>

      <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
        {images.map((url, index) => (
          <img
            key={index}
            src={url}
            alt="Uploaded"
            width={100}
            style={{ borderRadius: 8 }}
          />
        ))}
      </div>
    </div>
  );
}

InputFileUpload.propTypes = {
  setSelectedImages: PropTypes.func.isRequired,
};
