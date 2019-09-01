const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const BookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }, 
    genre: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    author:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Books', BookSchema)