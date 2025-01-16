const mongoose = require('mongoose')

const acceptedOrder = mongoose.Schema({
    orderProductId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userOrder'
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sellerdetail'
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('acceptedOrder', acceptedOrder);