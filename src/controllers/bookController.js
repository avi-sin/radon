const authorModel = require("../models/authorModel")
const publisherModel = require("../models/publisherModel")
const bookModel= require("../models/bookModel")


// Reference and populate assignment :-

// Problem 3 : POST api to create a book

const createBook= async function (req, res) {
    let book = req.body

    if (book.author == undefined) {
        if (book.publisher == undefined) {
            res.send({msg: "Author Id and Publisher Id are required."})
        } else if (book.publisher != undefined) {
            res.send({msg: "Author Id is required."})
        }
    } else if (book.author != undefined) {
        if (book.publisher == undefined) {
            res.send({msg: "Publisher Id is required."})
        } else if (book.publisher != undefined) {
            let aId = await authorModel.findById(book.author)
            let pId = await publisherModel.findById(book.publisher)
            if (aId == null) {
                res.send({msg: "Author is not present."})
            } else {
                if (pId == null) {
                    res.send({msg: "Publisher is not present."})
                } else {
                    let bookCreated = await bookModel.create(book)
                    res.send({bookCreated})
                }
            }
        }
    }    
}

/* 
const getBooksData= async function (req, res) {
    let books = await bookModel.find()
    res.send({data: books})
}
*/


// Reference and populate assignment :-

// Problem 4 : GET api to fetch all the books along with the authors and publishers.

const getBooksWithAuthorDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate(['author', 'publisher'])
    res.send({data: specificBook})

}


// Reference and populate assignment :-

// Problem 5 ( a ) : PUT api to update the isHardCover status of books of certain publishers

const updateHardCover = async function (req, res) {
    let arr = await publisherModel.find({ name : {$in: ["Penguin", "HarperCollins"]} })
    // console.log(arr);
    let updated
    for (let i = 0; i < arr.length; i++) {
        updated = await bookModel.updateMany(
            {publisher: arr[i]._id },
            { $set: { isHardCover : true } }
        )
    }
    res.send({updated})
}


// Reference and populate assignment :-

// Problem 5 ( b ) : PUT api to update the price of books certain high rating authors

const updatePrice = async function (req, res) {
    let arr = await authorModel.find({rating: {$gt: 3.5}})
    let updatedPrice
    for (let i = 0; i < arr.length; i++) {
        updatedPrice = await bookModel.updateMany(
            {author: arr[i]._id},
            {$inc: { price : 10} }
        )
    }
    res.send({updatedPrice})
}



module.exports.createBook = createBook
// module.exports.getBooksData= getBooksData
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
module.exports.updateHardCover = updateHardCover
module.exports.updatePrice = updatePrice
