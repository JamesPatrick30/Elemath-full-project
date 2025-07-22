// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  profile: String,
  firstname:     { type: String, required: true },
  middlename: { type: String, required: true },
  lastname: { type: String, required: true },
  lrn:      { type: String, required: true, unique: true },
  email:    { type: String, unique: true },
  password: { type: String, required: true },
  classId:  { type: String, ref: 'Class' }
});

module.exports = mongoose.model('Student_enrolled', studentSchema);