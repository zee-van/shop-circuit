const mongoose = require('mongoose');


const sellerPosts = mongoose.Schema({
    productName: { type: String },
    image: { 
        type: Buffer
     },
    description: { type: String },
    price: { type: String },
    category: { type: String },
    productOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sellerdetail'
    },
    date: {
        type: Date,
        default: Date.now
    },
    // likes:[
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'user'
    //     }
    // ]

})

module.exports = mongoose.model('sellerPost', sellerPosts);