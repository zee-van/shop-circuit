const mongoose = require('mongoose')

const userOrder = mongoose.Schema({
    number: { type: Number },
    username: { type: String },
    location: { type: String },
    description: { type: String },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sellerPost'
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sellerdetail'
    },
    productDetail: {},
    status: {
        type: String,
        default: "Accept"
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('userOrder', userOrder);