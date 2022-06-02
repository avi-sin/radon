const express = require('express');
// const myHelper = require('../util/helper')
// const underscore = require('underscore')
const lodash = require('lodash')

const router = express.Router();

router.get('/test-me', function (req, res) {
    

    res.send('My first ever api!')
});

router.get('/hello', function (req, res) {

    // Nodejs Modules assignment : Problem 4 (lodash library)

    // Part 1 : .chunk function

    let months = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`]
    let splitArray = lodash.chunk(months, 3)
    console.log("Split-Array: ", splitArray);
    console.log("Sub-arrays: ");
    for (let i = 0; i < splitArray.length; i++) {
        console.log(splitArray[i]); 
    }


    // Part 2 : .tail function

    let oddNum = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
    let lastNine = lodash.tail(oddNum)
    console.log("Last nine elements are : ");
    console.log(lastNine);


    // Part 3 : .union function

    const arr1 = ['Surya', 'Asif', 'Meenakshi']
    const arr2 = ['Asif', 'Pradeep']
    const arr3 = ['Pradeep', 'Abhishek', 'Ashutosh', 'Rahul']
    const arr4 = ['Bhawna', 'Vaishali', 'Vibha', 'Surya']
    const arr5 = ['Meenakshi', 'Asif', 'Bhawna', 'Abhishek', 'Ashutosh']
    let mergedArray = lodash.union(arr1, arr2, arr3, arr4, arr5)
    console.log(`The merged array is :`);
    console.log(mergedArray);
    

    // Part 4 : .fromPairs function

    let favMovies = lodash.fromPairs([["drama", "Forrest Gump"], ["romance", "The Lake House"], ["space", "Intersteller"], ["thriller", "Shutter Island"], ["fantasy", "Pans Labyrinth"]])
    console.log(favMovies);

    res.send('Hello there!')
});

router.get('/candidates', function(req, res){
    console.log('Query paramters for this request are '+JSON.stringify(req.query))
    let gender = req.query.gender
    let state = req.query.state
    let district = req.query.district
    console.log('State is '+state)
    console.log('Gender is '+gender)
    console.log('District is '+district)
    let candidates = ['Akash','Suman']
    res.send(candidates)
})

router.get('/candidates/:canidatesName', function(req, res){
    console.log('The request objects is '+ JSON.stringify(req.params))
    console.log('Candidates name is '+ req.params.canidatesName)
    res.send('Done')
})


module.exports = router;
// adding this comment for no reason


