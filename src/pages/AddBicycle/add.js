// src/pages/AddBicycle/AddBicycle.js
import React, { useState } from 'react';
import './Addbicycle.css';

function AddBicycle({ onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    color: '',
    imageUrl: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formattedData = {
      name: formData.name,
      brand: formData.brand,
      color: formData.color,
      image_url: formData.imageUrl, // <-- change key to match Bicycles.js
    };
  
    fetch('https://bicycle-backend.onrender.com/bicycles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedData),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to add bicycle');
        return res.json();
      })
      .then((newBike) => {
        onAdd(newBike);
        setFormData({
          name: '',
          brand: '',
          color: '',
          imageUrl: '',
        });
        setSuccessMessage('✅ Bicycle added successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  

  return (
    <div className="add-bicycle-container">
      <h2>Add a New Bicycle</h2>
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Brand:</label>
        <input
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          required
        />

        <label>Color:</label>
        <input
          name="color"
          value={formData.color}
          onChange={handleChange}
          required
        />

        <label>Image URL:</label>
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Enter image URL"
        />

        {formData.imageUrl && (
          <img
            src={formData.imageUrl}
            alt="Preview"
            style={{ width: '100%', borderRadius: '8px', marginTop: '10px' }}
          />
        )}

        <button type="submit">Add Bicycle</button>
      </form>
    </div>
  );
}

export default AddBicycle;
