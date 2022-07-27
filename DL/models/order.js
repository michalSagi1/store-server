// require('../db').connect()

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    items: [{ itemId: { type: String }, qty: { type: Number } }],

    createDate: {
        type: Date, default: Date.now
    }
})
const orderModel = mongoose.model('order', orderSchema);

module.exports = { orderModel }