const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    lrn: {
        type: String,
        required: true
    },
    name: String,
    lastName: String,
    firstName: String,
    middlename: String,
});

const Student = mongoose.model('Student_list', studentSchema);

module.exports = Student;