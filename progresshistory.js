import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProgressHistory = ({ patientId }) => {
  const [progressHistory, setProgressHistory] = useState([]);

  useEffect(() => {
    const fetchProgressHistory = async () => {
      try {
        const res = await axios.get(http://localhost:5000/api/progress/history/${patientId});
        setProgressHistory(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (patientId) {
      fetchProgressHistory();
    }
  }, [patientId]);

  return (
    <div>
      <h2>Progress History</h2>
      {progressHistory.length === 0 ? (
        <p>No progress records found.</p>
      ) : (
        <ul>
          {progressHistory.map((record) => (
            <li key={record._id}>
              <strong>Date:</strong> {new Date(record.sessionDate).toLocaleDateString()}<br />
              <strong>Goals Achieved:</strong> {record.goalsAchieved} / {record.totalGoals}<br />
              <strong>Progress Note:</strong> {record.progressNote}<br />
              <strong>Therapist:</strong> {record.therapist.username}<br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProgressHistory;