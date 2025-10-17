const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  
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
  }],
  gradeLevel: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Class', classSchema);
