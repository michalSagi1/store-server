// require('../db').connect()

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },

    isActiv: {
        type: Boolean, default: true
    },
    createDate: {
        type: Date, default: Date.now
    },
    lastLog: {
        type: Date, default: Date.now
    },
    admin: {
        type: Boolean, default: false
    }



})
const userModel = mongoose.model('user', userSchema);

module.exports = { userModel }