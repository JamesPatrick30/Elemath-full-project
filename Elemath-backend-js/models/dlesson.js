const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonFile = new Schema({
    title: String,
    summary: String,
    htmlLesson: String,
    file:String,
    dateCreated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('defaultlessons',lessonFile);