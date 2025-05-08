// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>BicycleBase</h2>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/users" style={styles.link}>Users</Link>
        <Link to="/add-bicycle" style={styles.link}>Add Bicycle</Link>
        <Link to="/bicycles" style={styles.link}>Bicycles</Link>
        <Link to="/maintenance" style={styles.link}>Maintenance</Link>
        <Link to="/rides" style={styles.link}>Rides</Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#f0f0f0',
    borderBottom: '2px solid #ddd',
    width: '100%',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    margin: 0,
    color: '#333',
  },
  links: {
    display: 'flex',
    gap: '1rem',
  },
  link: {
    textDecoration: 'none',
    color: '#0077cc',
    fontWeight: '500',
  }
};


export default Navbar;
