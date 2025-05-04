import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [activePopup, setActivePopup] = useState(null);

  const handleLearnMore = (feature) => {
    setActivePopup(feature);
  };

  const closePopup = () => {
    setActivePopup(null);
  };

  return (
    <div className="home-wrapper">
      {/* Welcome Video Section */}
      <section className="hero-section">
        <video autoPlay muted loop playsInline className="background-video">
          <source src="/videos/156837-813735294_small.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay">
          <h1>Welcome to BicycleBase 🚴‍♂️</h1>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="intro-section">
        <div className="intro-content">
          <h2>Track, Maintain, and Ride</h2>
          <p>
            BicycleBase is your go-to app for organizing your bicycles, logging maintenance history,
            and tracking your rides—all in one user-friendly platform.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="features-heading">What You Can Do</h2>
        <div className="feature-cards">
          {/* Feature 1 */}
          <div className="feature-card">
            <h3>🚲 Track Your Bicycles</h3>
            <p>Easily manage your entire bicycle collection, from name and brand to colors and photos.</p>
            <div className="feature-card-buttons">
              <Link to="/users" className="home-btn primary">Login / Sign Up</Link>
              <button onClick={() => handleLearnMore('bicycles')} className="home-btn secondary">Learn More</button>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="feature-card">
            <h3>🛠 Maintenance Logs</h3>
            <p>Track services and upgrades for each of your bikes.</p>
            <div className="feature-card-buttons">
              <Link to="/users" className="home-btn primary">Login / Sign Up</Link>
              <button onClick={() => handleLearnMore('maintenance')} className="home-btn secondary">Learn More</button>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="feature-card">
            <h3>📍 Ride History</h3>
            <p>Log your rides, routes, and performance over time.</p>
            <div className="feature-card-buttons">
              <Link to="/users" className="home-btn primary">Login / Sign Up</Link>
              <button onClick={() => handleLearnMore('rides')} className="home-btn secondary">Learn More</button>
            </div>
          </div>
        </div>
      </section>

      {/* Popup Modal */}
      {activePopup && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-popup" onClick={closePopup}>✖</button>
            {activePopup === 'bicycles' && (
              <>
                <h3>🚲 Track Your Bicycles</h3>
                <p>
                  Add bicycles with details like brand, color, and photos. Perfect for keeping tabs on your growing collection! 📸🎨
                </p>
              </>
            )}
            {activePopup === 'maintenance' && (
              <>
                <h3>🛠 Maintenance Logs</h3>
                <p>
                  Record repairs, upgrades, and regular maintenance so your bikes stay in peak condition. 🔧📅
                </p>
              </>
            )}
            {activePopup === 'rides' && (
              <>
                <h3>📍 Ride History</h3>
                <p>
                  Log your cycling adventures, track performance, and revisit your favorite routes. 🗺️📈
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
