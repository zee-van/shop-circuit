const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/projectshopcircuit');



const adminSchema = mongoose.Schema({
    role: {
        type: String,
        default: 'admin'
    },
    number: { type: Number },
    username: { type: String },
    email: { type: String },
    password: { type: String },
    conformPassword: { type: String },
    profilePic: {
        type: Buffer,
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('admin', adminSchema);