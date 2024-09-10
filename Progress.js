const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming the therapist is a User
    required: true,
  },
  sessionDate: {
    type: Date,
    default: Date.now,
  },
  progressNote: {
    type: String,
    required: true,
  },
  goalsAchieved: {
    type: Number, // Number of goals achieved in the session
    required: true,
  },
  totalGoals: {
    type: Number, // Total number of goals set
    required: true,
  }
});

module.exports = mongoose.model('Progress', ProgressSchema);
