const mongoose = require('mongoose');


const userPosts = mongoose.Schema({
    number: { type: Number },
    username: { type: String },
    productName: { type: String },
    image: {
        type: Buffer
    },
    description: { type: String },
    price: { type: String },
    category: { type: String },
    location: { type: String },
    productOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sellerdetail'
    },
    status: { type: String, default: 'Pending' },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('userPost', userPosts);
