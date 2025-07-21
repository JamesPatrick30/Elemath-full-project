const mongoose = require('mongoose');

const ClassScema = new mongoose.Schema({
  Class_id: { type: String, required: true,},
  Class_name: { type: String, required: true },
},{_id : false});

const teacherSchema = new mongoose.Schema({
  Email: { type: String, required: true, unique: true },
  username: { type: String },
  profile:String,
  googleprofile:String,
  firstName: String,
  middleName: String,
  lastName: String,
  class:{
    type:[ClassScema],
    default: []
  },
  password: { type: String}
});

module.exports = mongoose.model('teacher_accoount', teacherSchema);