const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)

router.post("/cowin/getOtp", CowinController.getOtp)

router.get("/cowin/getByDistrictId", CowinController.getByDistrictId)  // 1

router.get("/getWeather", CowinController.getWeather)  // 2 (a)

router.get("/getTemp", CowinController.getTemp)  // 2 (b)

router.get("/sortByTemp", CowinController.sortByTemp)  // 2 (c)

router.post("/myMeme", CowinController.myMeme)  // 3

// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date



module.exports = router;