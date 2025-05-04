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

function App() {
  const [bicycles, setBicycles] = useState([]);
  const [maintenanceLogs, setMaintenanceLogs] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/bicycles")
      .then((res) => res.json())
      .then(setBicycles)
      .catch((err) => console.error("Error fetching bicycles:", err));

    fetch("http://localhost:5000/maintenance")
      .then((res) => res.json())
      .then(setMaintenanceLogs)
      .catch((err) => console.error("Error fetching maintenance logs:", err));

    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then(setUsers)
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleAddBicycle = (newBike) => setBicycles((prev) => [...prev, newBike]);
  const handleAddMaintenance = (log) => setMaintenanceLogs((prev) => [...prev, log]);
  const handleAddUser = (newUser) => setUsers((prev) => [...prev, newUser]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bicycles" element={<Bicycles bicycles={bicycles} setBicycles={setBicycles} />} />
        <Route path="/add-bicycle" element={<AddBicycle onAdd={handleAddBicycle} />} />
        <Route path="/maintenance" element={<Maintenance bicycles={bicycles} maintenanceLogs={maintenanceLogs} onAddMaintenance={handleAddMaintenance} />} />
        <Route path="/rides" element={<Rides bicycles={bicycles} users={users} />} />
        <Route path="/users" element={<Users onAddUser={handleAddUser} />} />
      </Routes>
    </div>
  );
}

export default App;
