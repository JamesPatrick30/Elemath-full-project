const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  _id: {
    type: String, // Example: "Grade6A"
    required: true
  },
  Class_name: {
    type: String,
    required: true
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'teacher_accoount',
    required: true // ✅ Optional, but recommended if every class must have a teacher
  },
  studentIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
});

module.exports = mongoose.model('Class', classSchema);
