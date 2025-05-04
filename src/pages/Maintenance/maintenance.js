import React, { useState } from 'react';
import './maintenance.css';

const Maintenance = ({ bicycles, maintenanceLogs, onAddMaintenance }) => {
  const [formData, setFormData] = useState({
    bicycleName: '',
    type: 'Service',
    date: '',
    notes: '',
  });

  const [logs, setLogs] = useState(maintenanceLogs);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newLog = {
      ...formData,
      progress: 10,
    };

    onAddMaintenance(newLog); // optional: remove this if you're fully switching to local state
    setLogs(prev => [...prev, newLog]);
    setFormData({ bicycleName: '', type: 'Service', date: '', notes: '' });
  };

  const updateProgress = (index, delta) => {
    setLogs(prev =>
      prev.map((log, i) =>
        i === index
          ? {
              ...log,
              progress: Math.max(0, Math.min(100, (log.progress || 0) + delta)),
            }
          : log
      )
    );
  };

  return (
    <div className="maintenance-page">
      <h1>Maintenance Log</h1>

      <form className="maintenance-form" onSubmit={handleSubmit}>
        <select
          name="bicycleName"
          value={formData.bicycleName}
          onChange={handleChange}
          required
        >
          <option value="">Select Bicycle</option>
          {bicycles.map((bike, index) => (
            <option key={index} value={bike.name}>
              {bike.name}
            </option>
          ))}
        </select>

        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="Service">Service</option>
          <option value="Upgrade">Upgrade</option>
        </select>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
        />

        <button type="submit">Add Log</button>
      </form>

      <div className="maintenance-logs">
        <h2>Log Entries</h2>
        {logs.length === 0 ? (
          <p>No maintenance records yet.</p>
        ) : (
          logs.map((log, index) => (
            <div key={index} className="maintenance-card">
              <h3>{log.bicycleName}</h3>
              <p><strong>Type:</strong> {log.type}</p>
              <p><strong>Date:</strong> {log.date}</p>
              <p><strong>Notes:</strong> {log.notes}</p>

              <div className="progress-bar-container">
              <div
                  className={`progress-bar-fill ${log.progress === 100 ? 'complete' : ''}`}
                  style={{ width: `${log.progress || 0}%` }}
                >
                  <span className="progress-label">
                    {log.progress === 100 ? '✔️ 100%' : `${log.progress || 0}%`}
                  </span>
                </div>

              </div>

              <div className="progress-buttons">
                <button onClick={() => updateProgress(index, -10)}>-</button>
                <button onClick={() => updateProgress(index, 10)}>+</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Maintenance;
