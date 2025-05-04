// src/pages/Users/Users.js
import React, { useState, useEffect } from 'react';
import './Users.css';

const API_BASE_URL = 'http://localhost:5000';

const Users = ({ onAddUser }) => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loginEmail, setLoginEmail] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch all users (for display)
  const fetchUsers = () => {
    fetch(`${API_BASE_URL}/users`)
      .then(res => res.json())
      .then(setUsers)
      .catch(error => console.error('Error fetching users:', error));
  };

  // Check if session exists
  const checkSession = () => {
    fetch(`${API_BASE_URL}/check_session`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('No session');
      })
      .then(user => setLoggedInUser(user))
      .catch(() => setLoggedInUser(null));
  };

  useEffect(() => {
    fetchUsers();
    checkSession();
  }, []);

  // Handle new user creation
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
        onAddUser(newUser);
        setTimeout(() => setSuccessMessage(''), 3000);
      })
      .catch(error => console.error('Error adding user:', error));
  };

  // Handle login
  const handleLogin = () => {
    fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email: loginEmail })
    })
      .then(res => {
        if (!res.ok) throw new Error('Login failed');
        return res.json();
      })
      .then(data => {
        setLoggedInUser(data.user);
        setLoginEmail('');
      })
      .catch(err => alert('❌ Login failed. Check email.'));
  };

  // Handle logout
  const handleLogout = () => {
    fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    })
      .then(() => {
        setLoggedInUser(null);
      });
  };

  return (
    <div className="users-container">
      <h2>👤 User Management</h2>

      {loggedInUser ? (
        <div className="logged-in-info">
          <p>✅ Logged in as <strong>{loggedInUser.name}</strong> ({loggedInUser.email})</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="login-form">
          <h4>🔐 Login</h4>
          <input
            type="email"
            placeholder="Enter your email"
            value={loginEmail}
            onChange={e => setLoginEmail(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}

      <h3>➕ Create New User</h3>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email (optional)"
          value={formData.email}
          onChange={handleChange}
        />
        <button type="submit">Create User</button>
      </form>

      <h3>📋 Registered Users</h3>
      <ul className="user-list">
        {users.length === 0 ? (
          <p>No users yet.</p>
        ) : (
          users.map(user => (
            <li key={user.id}>
              <strong>{user.name}</strong> {user.email && <>({user.email})</>}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Users;
