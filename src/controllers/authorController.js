const AuthorModel= require("../models/authorModel")


// Reference and populate assignment :-

// Problem 1 : POST api to create author

const createAuthor= async function (req, res) {
    let author = req.body
    let authorCreated = await AuthorModel.create(author)
    res.send({data: authorCreated})
}

/*
const getAuthorsData= async function (req, res) {
    let authors = await AuthorModel.find()
    res.send({data: authors})
}
*/

module.exports.createAuthor= createAuthor
// module.exports.getAuthorsData= getAuthorsData