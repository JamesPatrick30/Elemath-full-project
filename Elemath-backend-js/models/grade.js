// models/Gradebook.js
const mongoose = require('mongoose');

const gradebookSchema = new mongoose.Schema({
  studentId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  classId:       { type: String, ref: 'Class' },
  gradingPeriod: { type: String }, // e.g., Q1, Q2, Final
  grades: {
    quizzes: [
      { quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }, percentage: Number }
    ],
    manual: [
      { label: String, score: Number, total: Number }
    ]
  },
  weights: {
    quiz:   { type: Number, default: 0.6 },
    manual: { type: Number, default: 0.4 }
  },
  computed: {
    quizAverage:   Number,
    manualAverage: Number,
    finalGrade:    Number,
    status:        { type: String, enum: ['pass', 'fail'] }
  },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Gradebook', gradebookSchema);
