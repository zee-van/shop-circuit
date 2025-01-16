const mongoose = require('mongoose');


const sellerSchema = mongoose.Schema({
    role: { 
        type: String,
        default: ""
     },
    number: { type: Number },
    username: { type: String },
    email: { type: String },
    password: { type: String },
    conformPassword: { type: String },
    category: { type: String },
    profilePic: {
        type: Buffer,
    },
    date: {
        type: Date,
        default: Date.now
    },

    sellerPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'sellerPost'
        }
    ],
    userPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userPost'
        }
    ]
})

module.exports = mongoose.model('sellerdetail', sellerSchema);

