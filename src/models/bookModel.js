const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {

    bookName: {
        type: String,  // can't contain already existing book.
        unique: true,
        required: true
    },
    authorName: String,
    category: String,
    year: Number,
    
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema)  // books