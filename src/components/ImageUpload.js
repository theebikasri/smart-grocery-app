import { useState } from 'react';

export default function ImageUpload({ onUpload }) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'smartgrocery'); // replace with your preset

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dh4wk6eqw/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      onUpload(data.secure_url); // pass image URL to parent
    } catch (err) {
      alert('Image upload failed!');
      console.error(err);
    }

    setUploading(false);
  };

  return (
    <div className="mb-4 text-center">
      <label className="block text-lg font-semibold text-gray-800 mb-2">
        Upload an Image 📷
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-2"
      />
      {uploading && <p className="text-sm text-blue-600">Uploading...</p>}
    </div>
  );
}