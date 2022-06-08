const express = require('express');
const router = express.Router();


const BookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


// ------------   Mondo session 3 assignment   ------------------ //

router.post("/bookWithAuthorId", BookController.bookWithAuthorId )
router.post("/authorModel", BookController.authorModel )
router.get("/booksByChetanBhagat", BookController.booksByChetanBhagat )
router.get("/authorAndUpdate", BookController.authorAndUpdate )
router.get("/selectBooksAndAuthor", BookController.selectBooksAndAuthor )

// ------------   Mondo session 3 assignment   ------------------ //


module.exports = router;