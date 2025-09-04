// models/Gradebook.js
const mongoose = require('mongoose');
// const student = require('./student');

const studentSchema = new mongoose.Schema({
  lrn:String,
  name: String,
  score: Number,
  average:Number
}, { _id: false });
const questionSchema = new mongoose.Schema({
  number: String,
  question:String,
  studentCorrect:Number,
  topic:String,
  answer:{type: mongoose.Schema.Types.Mixed},
  choices: {
    type: [mongoose.Schema.Types.Mixed],
    default:[]
  }
}, { _id: false });
const quizSchema = new mongoose.Schema({
  quizId:String,
  quizname: String,
  total:Number,
  quizMode:String,
  students: [studentSchema],
  totalAverage:Number,
  lowAnalysis:[{ type: mongoose.Schema.Types.Mixed }],
  questions:[questionSchema]
}, { _id: false });
const studentListSchema = new mongoose.Schema({
  lrn:String,
  name:String
}, { _id: false });

const gradebookSchema = new mongoose.Schema({
  classId:       { type: String, ref: 'Class' },
  gradingPeriod: { type: String }, // e.g., Q1, Q2, Final
  students:[studentListSchema],
  dateCreated: { type: Date, default: Date.now },
  quizzes: [quizSchema],
  analysis:{
    lineChart: {
      type: [mongoose.Schema.Types.Mixed],
      default: []
    },
  }
});

module.exports = mongoose.model('Gradebook', gradebookSchema);
