// src/pages/Users/Users.js
import React, { useState, useEffect } from 'react';
import './Users.css';

const API_BASE_URL = 'http://localhost:5000';

const Users = ({ onAddUser }) => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [successMessage, setSuccessMessage] = useState('');

  const fetchUsers = () => {
    fetch(`${API_BASE_URL}/users`)
      .then(res => res.json())
      .then(setUsers)
      .catch(error => console.error('Error fetching users:', error));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add user');
        return res.json();
      })
      .then(newUser => {
        setFormData({ name: '', email: '' });
        setSuccessMessage('✅ User added successfully!');
        fetchUsers();
        onAddUser(newUser); // Notify App state
        setTimeout(() => setSuccessMessage(''), 3000);
      })
      .catch(error => console.error('Error adding user:', error));
  };

  return (
    <div className="users-container">
      <h2>👤 Add New User</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleSubmit} className="user-form">
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email (optional)" value={formData.email} onChange={handleChange} />
        <button type="submit">Create User</button>
      </form>
      <h3>📋 Registered Users</h3>
      <ul className="user-list">
        {users.length === 0 ? (
          <p>No users yet.</p>
        ) : (
          users.map(user => (
            <li key={user.id}><strong>{user.name}</strong> {user.email && <>({user.email})</>}</li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Users;
