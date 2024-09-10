import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProgressLogForm = () => {
  const [patientId, setPatientId] = useState('');
  const [therapistId, setTherapistId] = useState(''); // This should be fetched from the logged-in user
  const [sessionDate, setSessionDate] = useState('');
  const [progressNote, setProgressNote] = useState('');
  const [goalsAchieved, setGoalsAchieved] = useState(0);
  const [totalGoals, setTotalGoals] = useState(0);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/patient/all'); // Create an endpoint to get all patients
        setPatients(res.data);
      } catch (err) {
        console.error(err);
      }

      // Set the therapist ID from the logged-in user
      setTherapistId(localStorage.getItem('therapistId'));
    };

    fetchPatients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const progress = {
      patientId,
      therapistId,
      sessionDate,
      progressNote,
      goalsAchieved,
      totalGoals
    };

    try {
      const res = await axios.post('http://localhost:5000/api/progress/log', progress);
      alert(res.data.msg);
    } catch (err) {
      alert('Error logging progress');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log Patient Progress</h2>

      <div>
        <label>Patient</label>
        <select value={patientId} onChange={(e) => setPatientId(e.target.value)} required>
          <option value="">Select Patient</option>
          {patients.map((patient) => (
            <option key={patient._id} value={patient._id}>
              {patient.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Session Date</label>
        <input
          type="date"
          value={sessionDate}
          onChange={(e) => setSessionDate(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Progress Note</label>
        <textarea
          value={progressNote}
          onChange={(e) => setProgressNote(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Goals Achieved</label>
        <input
          type="number"
          value={goalsAchieved}
          onChange={(e) => setGoalsAchieved(parseInt(e.target.value, 10))}
          required
        />
      </div>

      <div>
        <label>Total Goals</label>
        <input
          type="number"
          value={totalGoals}
          onChange={(e) => setTotalGoals(parseInt(e.target.value, 10))}
          required
        />
      </div>

      <button type="submit">Submit Progress</button>
    </form>
  );
};

export default ProgressLogForm;