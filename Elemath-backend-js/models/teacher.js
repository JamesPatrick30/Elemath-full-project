const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  lrn: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String
});
const ClassSchema = new mongoose.Schema({
  className: { type: String, required: true },
  classCode: { type: String, required: true, unique: true },
  students: {
    type: [studentSchema], // Array of student emails
    default: []
  }
});
const teacherSchema = new mongoose.Schema({
  Email: { type: String, required: true, unique: true },
  firstName: String,
  middleName: String,
  lastName: String,
  class:{
    type:[ClassSchema],
    default: []
  },
  password: { type: String, required: true }
});

module.exports = mongoose.model('teacher_accoount', teacherSchema);