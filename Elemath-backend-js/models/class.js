const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  _id:       { type: String }, // use "grade6A", "grade5B" etc. as _id
  Class_name:  { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'teacher_accoount' },
  studentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});

module.exports = mongoose.model('Class', classSchema);