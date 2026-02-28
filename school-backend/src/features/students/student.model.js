const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    grade: { type: String, required: true},
    class: { type: String, required: true},
    birthday: { type: Date, required: true},
    gender: { type: String, required: true}
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;