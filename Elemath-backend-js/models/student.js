// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  profile: String,
  name:     { type: String, required: true },
  lrn:      { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  classId:  { type: String, ref: 'Class' }
});

module.exports = mongoose.model('Student', studentSchema);