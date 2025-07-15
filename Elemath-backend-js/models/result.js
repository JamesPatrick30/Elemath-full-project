// models/Result.js
const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  quizId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  studentId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  score:      { type: Number },
  total:      { type: Number },
  percentage: { type: Number },
  status:     { type: String, enum: ['pass', 'fail'] },
  submittedAt:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', resultSchema);
