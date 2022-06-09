const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const publisherController= require("../controllers/publisherController")
const bookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor  )  // 1
// router.get("/getAuthorsData", authorController.getAuthorsData)

router.post("/createPublisher", publisherController.createPublisher)  // 2
// router.get("/getPublishersData", publisherController.getPublishersData)

router.post("/createBook", bookController.createBook  )  // 3

// router.get("/getBooksData", bookController.getBooksData)

router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)  // 4

router.put("/updateBooksHardCover", bookController.updateHardCover)  // 5 ( a )

router.put("/updateBooksPrice", bookController.updatePrice)

module.exports = router;