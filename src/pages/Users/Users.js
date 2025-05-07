// src/pages/Users/Users.js
import React, { useState, useEffect } from 'react';
import './Users.css';

const API_BASE = 'https://bicycle-backend.onrender.com';

const Users = ({ onAddUser, setLoggedInUser }) => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [login, setLogin] = useState({ email: '', password: '' });
  const [sessionUser, setSessionUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  
    fetch(`${API_BASE}/check_session`, { credentials: 'include' })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        setSessionUser(data);
        if (data) setLoggedInUser(data);
      })
      .catch(() => {
        setSessionUser(null);
        setLoggedInUser(null);
      });
  }, [setLoggedInUser]); // ✅ include it here
  

  const fetchUsers = () => {
    fetch(`${API_BASE}/users`)
      .then(res => res.json())
      .then(setUsers);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => {
        if (!res.ok) throw new Error('Signup failed');
        return res.json();
      })
      .then(newUser => {
        setForm({ name: '', email: '', password: '' });
        fetchUsers();
        onAddUser(newUser);
      })
      .catch(err => {
        alert(err.message);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(login)
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setSessionUser(data.user);
          setLoggedInUser(data.user);
          setLogin({ email: '', password: '' });
        } else {
          alert(data.error || 'Login failed');
        }
      });
  };

  const handleLogout = () => {
    fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    }).then(() => {
      setSessionUser(null);
      setLoggedInUser(null);
    });
  };

  return (
    <div className="users-container">
      <h2>User Management</h2>

      <div className="user-section">
        {sessionUser ? (
          <div className="logged-in-box">
            <p>✅ Logged in as <strong>{sessionUser.name}</strong> ({sessionUser.email})</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <>
            <h3>🔐 Login</h3>
            <form className="user-form" onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={login.email}
                onChange={e => setLogin({ ...login, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={login.password}
                onChange={e => setLogin({ ...login, password: e.target.value })}
                required
              />
              <button type="submit">Login</button>
            </form>
          </>
        )}
      </div>

      <div className="user-section">
        <h3>Create New User</h3>
        <form className="user-form" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit">Create User</button>
        </form>
      </div>

      <div className="user-section">
        <h3>All Users</h3>
        <ul className="user-list">
          {users.map(u => (
            <li key={u.id}>
              {u.name} {u.email && <span>({u.email})</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Users;
