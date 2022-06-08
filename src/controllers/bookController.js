const { count } = require("console")

const BookWithAuthorId = require("../models/bookWithAuthorId")
const AuthorIdModel = require("../models/authorModel")


// Books and Authors (mongo session 3 assignment) :-

const bookWithAuthorId = async function (req, res) {
    let data = req.body
    let savedData = await BookWithAuthorId.create(data)
    res.send({msg: savedData})
}

const authorModel = async function (req, res) {
    let data = req.body
    let savedData = await AuthorIdModel.create(data)
    res.send({msg: savedData})
}

const booksByChetanBhagat = async function (req, res) {
    let authorArray = await AuthorIdModel.find( { author_name : "Chetan Bhagat" } )
    // console.log(authorArray);
    let id = authorArray[0].author_id
    let booksByChetanBhagat = await BookWithAuthorId.find( { author_id: id } )
    res.send({msg: booksByChetanBhagat})
}

const authorAndUpdate = async function (req, res) {
    let updatedData = await BookWithAuthorId.findOneAndUpdate(
        { name: "Two states" },
        { $set: { price: 100 } },
        { new: true }
    )
    // console.log(updatedData);
    // console.log(updatedData.author_id);
    let author = await AuthorIdModel.find( { author_id: updatedData.author_id } )
    // console.log(author[0].author_name);
    authorName = author[0].author_name
    res.send({updatedData, authorName} )
}

const selectBooksAndAuthor = async function (req, res) {
    let books = await BookWithAuthorId.find( { price: {$gte: 50, $lte: 100} } ).select( { name: 1, author_id: 1, _id: 0})
    // console.log(books);

    let authorName = await AuthorIdModel.find({author_id: books.map(x => x.author_id)}).select({author_id: 1, author_name: 1, _id: 0})
    // console.log(authorName);
    res.send({books, authorName})

}


module.exports.bookWithAuthorId = bookWithAuthorId
module.exports.authorModel = authorModel
module.exports.booksByChetanBhagat = booksByChetanBhagat
module.exports.authorAndUpdate = authorAndUpdate
module.exports.selectBooksAndAuthor = selectBooksAndAuthor



