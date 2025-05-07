import React, { useEffect, useState } from 'react';
import './Rides.css';

const API_BASE_URL = 'https://bicycle-backend.onrender.com';

const Rides = () => {
  const [rides, setRides] = useState([]);
  const [users, setUsers] = useState([]);
  const [bicycles, setBicycles] = useState([]);
  const [formData, setFormData] = useState({
    user_id: '',
    bicycle_id: '',
    date: '',
    distance_km: '',
    notes: ''
  });

  // Fetch all data
  useEffect(() => {
    fetch(`${API_BASE_URL}/rides`)
      .then(res => res.json())
      .then(data => setRides(data));

    fetch(`${API_BASE_URL}/users`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched users for Rides:", data);
        setUsers(data);
      });

    fetch(`${API_BASE_URL}/bicycles`)
      .then(res => res.json())
      .then(data => setBicycles(data));
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_BASE_URL}/rides`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(newRide => {
        setRides([...rides, newRide]);
        setFormData({
          user_id: '',
          bicycle_id: '',
          date: '',
          distance_km: '',
          notes: ''
        });
      });
  };

  return (
    <div className="rides-container">
      <h2>📍 Ride History</h2>

      <form onSubmit={handleSubmit} className="ride-form">
        <select name="user_id" value={formData.user_id} onChange={handleChange} required>
          <option value="">Select User</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>

        <select name="bicycle_id" value={formData.bicycle_id} onChange={handleChange} required>
          <option value="">Select Bicycle</option>
          {bicycles.map(bike => (
            <option key={bike.id} value={bike.id}>{bike.name}</option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="distance_km"
          value={formData.distance_km}
          onChange={handleChange}
          placeholder="Distance (km)"
          required
        />
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Notes (optional)"
        ></textarea>

        <button type="submit">Log Ride</button>
      </form>

      <h3 style={{ marginTop: '2rem' }}>Past Rides</h3>
      {rides.length === 0 ? (
        <p>No rides logged yet.</p>
      ) : (
        <ul className="ride-list">
          {rides.map((ride) => {
            const user = users.find(u => u.id === parseInt(ride.user_id));
            const bicycle = bicycles.find(b => b.id === parseInt(ride.bicycle_id));

            return (
              <li key={ride.id}>
                <strong>Date:</strong> {ride.date} | <strong>Distance:</strong> {ride.distance_km} km <br />
                <strong>Rider:</strong> {user ? user.name : 'Unknown'} | <strong>Bicycle:</strong> {bicycle ? bicycle.name : 'Unknown'}<br />
                <strong>Notes:</strong> {ride.notes || 'None'}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Rides;
