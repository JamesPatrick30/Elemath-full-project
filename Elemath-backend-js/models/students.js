const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    lrn: {
        type: String,
        required: true
    },
    lastName: String,
    firstName: String,
    middlename: String,
    gradeLevel: Number,
    section:String
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;