// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home/home';
import Bicycles from './pages/Bicycles/bicycles';
import AddBicycle from './pages/AddBicycle/add';
import Maintenance from './pages/Maintenance/maintenance';
import Rides from './pages/Rides/rides';
import Users from './pages/Users/Users';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [bicycles, setBicycles] = useState([]);
  const [maintenanceLogs, setMaintenanceLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    fetch("https://bicycle-backend.onrender.com/bicycles")
      .then((res) => res.json())
      .then(setBicycles)
      .catch((err) => console.error("Error fetching bicycles:", err));

    fetch("https://bicycle-backend.onrender.com/maintenance")
      .then((res) => res.json())
      .then(setMaintenanceLogs)
      .catch((err) => console.error("Error fetching maintenance logs:", err));

    fetch("https://bicycle-backend.onrender.com/users")
      .then((res) => res.json())
      .then(setUsers)
      .catch((err) => console.error("Error fetching users:", err));

    // Check login session
    fetch("https://bicycle-backend.onrender.com/check_session", {
      credentials: 'include',
    })
      .then((res) => res.ok ? res.json() : null)
      .then(data => setLoggedInUser(data))
      .catch(() => setLoggedInUser(null));
  }, []);

  const handleAddBicycle = (newBike) => setBicycles((prev) => [...prev, newBike]);
  const handleAddMaintenance = (log) => setMaintenanceLogs((prev) => [...prev, log]);
  const handleAddUser = (newUser) => setUsers((prev) => [...prev, newUser]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/bicycles"
          element={
            <ProtectedRoute isAuthenticated={!!loggedInUser}>
              <Bicycles bicycles={bicycles} setBicycles={setBicycles} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-bicycle"
          element={
            <ProtectedRoute isAuthenticated={!!loggedInUser}>
              <AddBicycle onAdd={handleAddBicycle} loggedInUser={loggedInUser}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/maintenance"
          element={
            <ProtectedRoute isAuthenticated={!!loggedInUser}>
              <Maintenance bicycles={bicycles} maintenanceLogs={maintenanceLogs} onAddMaintenance={handleAddMaintenance} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rides"
          element={
            <ProtectedRoute isAuthenticated={!!loggedInUser}>
              <Rides bicycles={bicycles} users={users} />
            </ProtectedRoute>
          }
        />
        <Route path="/users" element={<Users onAddUser={handleAddUser} setLoggedInUser={setLoggedInUser} />} />
      </Routes>
    </div>
  );
}

export default App;
