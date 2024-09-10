import React, { useState } from "react";
import './App.css';

const App = () => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    diagnosis: "",
    therapyGoals: "",
    sessionNotes: "",
    contactInfo: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentPatientIndex, setCurrentPatientIndex] = useState(null);

  // Handle form data changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add or update a patient
  const handleSubmit = () => {
    if (formData.name === "" || formData.diagnosis === "") {
      alert("Name and Diagnosis are required!");
      return;
    }

    if (isEditing) {
      const updatedPatients = patients.map((patient, index) =>
        index === currentPatientIndex ? formData : patient
      );
      setPatients(updatedPatients);
      setIsEditing(false);
      setCurrentPatientIndex(null);
    } else {
      setPatients([...patients, formData]);
    }

    // Clear form
    setFormData({
      name: "",
      age: "",
      diagnosis: "",
      therapyGoals: "",
      sessionNotes: "",
      contactInfo: "",
    });
  };

  // Edit patient
  const handleEdit = (index) => {
    setFormData(patients[index]);
    setIsEditing(true);
    setCurrentPatientIndex(index);
  };

  // Delete patient
  const handleDelete = (index) => {
    const updatedPatients = patients.filter((_, i) => i !== index);
    setPatients(updatedPatients);
  };

  return (
    <div className="app">
      <h1>Speech Therapy Patient Management</h1>

      <div className="form">
        <input
          type="text"
          name="name"
          placeholder="Patient Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />
        <input
          type="text"
          name="diagnosis"
          placeholder="Diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
        />
        <textarea
          name="therapyGoals"
          placeholder="Therapy Goals"
          value={formData.therapyGoals}
          onChange={handleChange}
        />
        <textarea
          name="sessionNotes"
          placeholder="Session Notes"
          value={formData.sessionNotes}
          onChange={handleChange}
        />
        <input
          type="text"
          name="contactInfo"
          placeholder="Contact Information"
          value={formData.contactInfo}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>
          {isEditing ? "Update Patient" : "Add Patient"}
        </button>
      </div>

      <div className="patient-list">
        <h2>Patients</h2>
        {patients.length === 0 ? (
          <p>No patients added yet.</p>
        ) : (
          <ul>
            {patients.map((patient, index) => (
              <li key={index}>
                <strong>{patient.name}</strong> | Age: {patient.age} | Diagnosis: {patient.diagnosis} 
                <br />
                <strong>Goals:</strong> {patient.therapyGoals}
                <br />
                <strong>Session Notes:</strong> {patient.sessionNotes}
                <br />
                <strong>Contact:</strong> {patient.contactInfo}
                <br />
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
.app {
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.form {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

input, textarea {
  padding: 10px;
  margin: 5px;
  width: 80%;
  font-size: 1em;
}

textarea {
  height: 100px;
  resize: none;
}

button {
  padding: 10px 15px;
  margin: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

.patient-list ul {
  list-style-type: none;
  padding: 0;
}

.patient-list li {
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  text-align: left;
}

.patient-list li button {
  margin-top: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.patient-list li button:last-child {
  background-color: #dc3545;
}

.patient-list li button:hover {
  background-color: #0056b3;
}

.patient-list li button:last-child:hover {
  background-color: #c82333;
}