const express = require('express');

const prob1Func = require('../logger/logger')
const prob2Func = require('../util/helper')
const prob3Func = require('../validator/formatter')

const router = express.Router();

router.get('/test-me', function (req, res) {
    
    prob1Func.welcomeFunc()
    prob2Func.printDate()
    prob2Func.printMonth()
    prob2Func.getBatchInfo()
    prob3Func.format()

    res.send('My first ever api!')
});

router.get('/test-me1', function (req, res) {
    res.send('My second ever api!')
});

router.get('/test-me2', function (req, res) {
    res.send('My third api!')
});

router.get('/test-me3', function (req, res) {
    res.send('My 4th api!')
});

router.get('/test-me4', function (req, res) {
    res.send('My last api!')
});

module.exports = router;
// adding this comment for no reason