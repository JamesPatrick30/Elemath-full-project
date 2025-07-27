// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  profile: String,
  name: String,
  firstname:     { type: String},
  middlename: { type: String},
  lastname: { type: String },
  lrn:      { type: String, unique: true },
  email:    { type: String, unique: true },
  password: { type: String, required: true },
  classId:  { type: String, ref: 'Class' }
});

module.exports = mongoose.model('Student_enrolled', studentSchema);