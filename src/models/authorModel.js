const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {

    authorName: String,
    age: Number,
    address: String,
    rating: Number

    // author_id: String,
    // author_name: String,
    // age:Number,
    // address:String

}, { timestamps: true });

module.exports = mongoose.model('NewAuthor', authorSchema)
