const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;

const adminSchema = new mongoose.Schema({
    name: String,
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isDeleted: {type: Boolean, default: false}
}, {timestamps: true});

const studentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    subject: {type: String, required: true},
    marks: {type: Number, required: true},
    adminId: {type: objectId, ref: 'Admin', required: true},
    isDeleted: {type: Boolean, default: false}
}, {timestamps: true});


const adminModel = mongoose.model('Admin', adminSchema);
const studentModel = mongoose.model('Student', studentSchema);

module.exports = {studentModel, adminModel};