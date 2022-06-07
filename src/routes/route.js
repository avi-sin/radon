const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUser", UserController.createUser  )

router.get("/getUsersData", UserController.getUsersData)



router.post("/createBook", BookController.createBook  )  // 1st

router.get("/bookList", BookController.bookList  ) // 2nd

router.post("/getBooksInYear", BookController.getBooksInYear  ) // 3rd

router.get("/getXINRBooks", BookController.getXINRBooks  ) // 4th

router.get("/getRandomBooks", BookController.getRandomBooks  ) // 5th

router.post("/getParticularBooks", BookController.getParticularBooks  ) // 6th



router.get("/getBooksData", BookController.getBooksData)

module.exports = router;