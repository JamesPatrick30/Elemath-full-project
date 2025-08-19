const mongoose = require('mongoose');
const playerSchema = new mongoose.Schema({
  player: String,
  lrn : String,
  profile:String
});
const dumpQuizSchema = new mongoose.Schema({
    quizId: String,
    quizName: {type:String,default:""},
    quizMode: {type:String,default:""},
    quizTime: {type:Number, default: 0},
    players:[playerSchema]
});
module.exports = mongoose.model('dumpQuiz', dumpQuizSchema);