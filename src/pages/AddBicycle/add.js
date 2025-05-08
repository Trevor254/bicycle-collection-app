// src/pages/AddBicycle/AddBicycle.js
import React, { useState } from 'react';
import './Addbicycle.css';

function AddBicycle({ onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    color: '',
    imageFile: null,
  });

  const [previewUrl, setPreviewUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, imageFile: file }));
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('brand', formData.brand);
    payload.append('color', formData.color);
    //payload.append('user_id', loggedInUser?.id.toString());
    if (formData.imageFile) {
      payload.append('image', formData.imageFile);
    }

    fetch('https://bicycle-backend.onrender.com/bicycles', {
      method: 'POST',
      body: payload,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to add bicycle');
        return res.json();
      })
      .then((newBike) => {
        onAdd(newBike);
        setFormData({ name: '', brand: '', color: '', imageFile: null });
        setPreviewUrl('');
        setSuccessMessage('✅ Bicycle added successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage('❌ Failed to add bicycle. Please try again.');
      });
  };

  return (
    <div className="add-bicycle-container">
      <h2>Add a New Bicycle</h2>
      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input name="name" value={formData.name} onChange={handleChange} required />
        <label>Brand:</label>
        <input name="brand" value={formData.brand} onChange={handleChange} required />
        <label>Color:</label>
        <input name="color" value={formData.color} onChange={handleChange} required />
        <label>Upload Image:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {previewUrl && <img src={previewUrl} alt="Preview" style={{ width: '100%', marginTop: '10px' }} />}
        <button type="submit">Add Bicycle</button>
      </form>
    </div>
  );
}

export default AddBicycle;
