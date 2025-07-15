// models/Quiz.js
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  classId:      { type: String, ref: 'Class' },
  createdBy:    { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  title:        { type: String, required: true },
  passingScore: { type: Number, default: 75 },
  questions: [
    {
      Q:        { type: String, required: true },
      type:     { type: String, enum: ['multiple', 'input'], required: true },
      choices:  [{ type: String }],
      answer:   { type: String }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quiz', quizSchema);