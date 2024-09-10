import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllocatePatient = () => {
  const [therapists, setTherapists] = useState([]);
  const [patients, setPatients] = useState([]); // Assuming you load patients too
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedTherapist, setSelectedTherapist] = useState('');

  // Load available therapists
  useEffect(() => {
    const fetchTherapists = async () => {
      const res = await axios.get('http://localhost:5000/api/patient/therapists');
      setTherapists(res.data);
    };

    const fetchPatients = async () => {
      const res = await axios.get('http://localhost:5000/api/patient/all'); // Create an endpoint to get all patients
      setPatients(res.data);
    };

    fetchTherapists();
    fetchPatients();
  }, []);

  const handleAllocate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/patient/allocate', {
        patientId: selectedPatient,
        therapistId: selectedTherapist,
      });
      alert(res.data.msg);
    } catch (err) {
      alert('Error allocating therapist');
    }
  };

  return (
    <form onSubmit={handleAllocate}>
      <h2>Allocate Therapist to Patient</h2>

      <div>
        <label>Patient</label>
        <select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}>
          <option value="">Select Patient</option>
          {patients.map((patient) => (
            <option key={patient._id} value={patient._id}>
              {patient.name} ({patient.condition})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Therapist</label>
        <select value={selectedTherapist} onChange={(e) => setSelectedTherapist(e.target.value)}>
          <option value="">Select Therapist</option>
          {therapists.map((therapist) => (
            <option key={therapist._id} value={therapist._id}>
              {therapist.username} (Role: {therapist.role})
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Allocate</button>
    </form>
  );
};

export default AllocatePatient;