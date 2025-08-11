const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonFile = new Schema({
    ownerId:String,
    file:String,
    dateCreated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('lessons',lessonFile);