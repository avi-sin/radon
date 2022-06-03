const express = require('express');
// const myHelper = require('../util/helper')
// const underscore = require('underscore')
const lodash = require('lodash')

const router = express.Router();

let players =
   [
       {
           "name": "manish",
           "dob": "1/1/1995",
           "gender": "male",
           "city": "jalandhar",
           "sports": [
               "swimming"
           ]
       },
       {
           "name": "gopal",
           "dob": "1/09/1995",
           "gender": "male",
           "city": "delhi",
           "sports": [
               "soccer"
           ],
       },
       {
           "name": "lokesh",
           "dob": "1/1/1990",
           "gender": "male",
           "city": "mumbai",
           "sports": [
               "soccer"
           ],
       },
   ]
 
   router.post('/players', function (req, res) {
 
       //LOGIC WILL COME HERE
    let ele = req.body.name
    let flag = false;
    for (let i = 0; i < players.length; i++) {
        if (ele == players[i].name) {
            flag = true;
            continue;
        } else if (ele != players[i].name) {
            players.push(req.body);
        }
    }
    if (flag = true) {
        players = "name already exists."
    }


       res.send(  { data: players , status: true }  )
   });


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


// get API assignment solution:

// Problem 1: GET /movies

router.get('/movies', function (req, res) {
    const movies = ['Rang de basanti', 'The shining', 'Lord of the rings', 'Batman begins']

    res.send( { movies: movies } )
});


// Problem 2 and Problem 3: GET /movies/:indexNumber

router.get('/movies/:indexNumber', function (req, res) {
    const movies = ['Rang de basanti', 'The shining', 'Lord of the rings', 'Batman begins']
    
    if (req.params.indexNumber < movies.length) {
        res.send(movies[req.params.indexNumber])
    } else {
        res.send(`Error: Use a valid index.`)
    }

});


// Problem 4: GET /films

router.get('/films', function (req, res) {
    const films = [{
        "id": 1,
        "name": "The Shining"
       },
       {
        "id": 2,
        "name": "Incendies"
       },
       {
        "id": 3,
        "name": "Rang de Basanti"
       },
       {
        "id": 4,
        "name": "Finding Nemo"
       }]

    res.send( { array: films } )
});


// Problem 5: GET /films/:filmId

router.get('/films/:filmId', function (req, res) {
    const films = [{
        "id": 1,
        "name": "The Shining"
       },
       {
        "id": 2,
        "name": "Incendies"
       },
       {
        "id": 3,
        "name": "Rang de Basanti"
       },
       {
        "id": 4,
        "name": "Finding Nemo"
       }]

    if (req.params.filmId <= films.length) {
        res.send(films[(req.params.filmId) - 1])
    } else {
        res.send(`No movie exists with this id`)
    }

    
});

// get API assignments solution ends here.

module.exports = router;
// adding this comment for no reason


