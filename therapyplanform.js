import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TherapyPlanForm = () => {
  const [therapistId, setTherapistId] = useState(''); // Will come from the logged-in user
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [goals, setGoals] = useState('');
  const [activities, setActivities] = useState('');
  const [progress, setProgress] = useState('');

  // Fetch available patients (assuming a logged-in therapist)
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/patient/all'); // Add an endpoint to get patients
        setPatients(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPatients();

    // Set the logged-in therapist (replace with actual login logic)
    setTherapistId(localStorage.getItem('therapistId'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const therapyPlan = {
      therapistId,
      patientId: selectedPatient,
      goals,
      activities,
      progress,
    };

    try {
      const res = await axios.post('http://localhost:5000/api/therapy-plan/create', therapyPlan);
      alert(res.data.msg);
    } catch (err) {
      alert('Error creating therapy plan');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Therapy Plan</h2>

      <div>
        <label>Patient</label>
        <select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}>
          <option value="">Select Patient</option>
          {patients.map((patient) => (
            <option key={patient._id} value={patient._id}>
              {patient.name} (Condition: {patient.condition})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Therapy Goals</label>
        <textarea
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          placeholder="Enter therapy goals"
          required
        />
      </div>

      <div>
        <label>Therapy Activities</label>
        <textarea
          value={activities}
          onChange={(e) => setActivities(e.target.value)}
          placeholder="Enter activities"
          required
        />
      </div>

      <div>
        <label>Progress</label>
        <textarea
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
          placeholder="Enter progress"
          required
        />
      </div>

      <button type="submit">Submit Therapy Plan</button>
    </form>
  );
};

export default TherapyPlanForm;