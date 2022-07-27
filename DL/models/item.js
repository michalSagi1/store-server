// require('../db').connect()

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    createDate: {
        type: Date, default: Date.now
    },

    isStock: {
        type: Boolean, default: true
    },
    inStock: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    id: {
        type: String,
        required: true,
        // unique: true
    },
    img: {
        type: String,
    },
    description: {
        type: String,
    },
    category: { type: String },
    rating: { rate: { type: Number }, count: { type: Number } }


})
const itemModel = mongoose.model('item', itemSchema);

module.exports = { itemModel }