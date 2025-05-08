import React, { useState } from 'react';
import './bicycles.css';
import bgImage from '../../assets/vecteezy_collection-silhouette-of-people-use-bicycle_13482516.jpg';
import bikeIcon from '../../assets/insignia.png'; // ← NEW
import { useNavigate } from 'react-router-dom';

const style = {
  backgroundImage: `url(${bgImage})`,
};

function Bicycles({ bicycles, setBicycles }) {
  const navigate = useNavigate();
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', brand: '', color: '', imageUrl: '' });

  const handleDelete = (id) => {
    fetch(`https://bicycle-backend.onrender.com/bicycles/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to delete bicycle');
        const updated = bicycles.filter((bike) => bike.id !== id);
        setBicycles(updated);
      })
      .catch((err) => {
        console.error('Error deleting bicycle:', err);
      });
  };

  const handleEdit = (index) => {
    const bike = bicycles[index];
    setEditForm({
      name: bike.name,
      brand: bike.brand,
      color: bike.color,
      imageUrl: bike.imageUrl || '',
    });
    setEditingIndex(index);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveEdit = () => {
    const updatedBike = {
      ...bicycles[editingIndex],
      ...editForm,
    };

    fetch(`https://bicycle-backend.onrender.com/bicycles/${updatedBike.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedBike),
    })
      .then((res) => res.json())
      .then((data) => {
        const updated = [...bicycles];
        updated[editingIndex] = data;
        setBicycles(updated);
        setEditingIndex(null);
      })
      .catch((err) => {
        console.error('Error saving edit:', err);
      });
  };

  const cancelEdit = () => {
    setEditingIndex(null);
  };

  return (
    <div style={style}>
      <div className="bicycle-list">
        <h2>Your Bicycle Collection</h2>
        {bicycles.length === 0 ? (
          <div className="no-bicycles">
            <img src={bikeIcon} alt="Bike icon" className="empty-icon" />
            <p>No bicycles added yet.</p>
          </div>
        ) : (
          <div className="bicycle-grid">
            {bicycles.map((bike, index) => (
              <div key={bike.id} className="bicycle-card">
                {bike.imageUrl && (
                  <img
                  src={`https://bicycle-backend.onrender.com${bike.imageUrl}`}
                  alt={`${bike.name} preview`}
                  className="bicycle-image"
                />
                
                )}

                {editingIndex === index ? (
                  <>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      placeholder="Name"
                    />
                    <input
                      type="text"
                      name="brand"
                      value={editForm.brand}
                      onChange={handleEditChange}
                      placeholder="Brand"
                    />
                    <input
                      type="text"
                      name="color"
                      value={editForm.color}
                      onChange={handleEditChange}
                      placeholder="Color"
                    />
                    <input
                      type="text"
                      name="imageUrl"
                      value={editForm.imageUrl}
                      onChange={handleEditChange}
                      placeholder="Image URL"
                    />
                    <div className="bicycle-card-buttons">
                      <button onClick={saveEdit}>Save</button>
                      <button onClick={cancelEdit}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3>{bike.name}</h3>
                    <p>Brand: {bike.brand}</p>
                    <p>Color: {bike.color}</p>
                    <div className="bicycle-card-buttons">
                      <button onClick={() => handleEdit(index)}>Edit</button>
                      <button onClick={() => handleDelete(bike.id)}>Delete</button>
                      <button onClick={() => navigate('/maintenance')}>Maintenance</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Bicycles;
