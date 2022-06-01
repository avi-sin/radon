const printDate = function() {
    let x = new Date()
    let date = x.getDate()
    console.log("Problem solution 2 :-");
    console.log("Day: " + date)
}

const printMonth = function() {
    let x = new Date()
    let month = x.getMonth()
    console.log("Month: " + month)
}

const getBatchInfo = function() {
    console.log("Radon, Week 3, Day 3, the topic being taught today is 'Nodejs module system.'\n")
}


module.exports.printDate = printDate
module.exports.printMonth = printMonth
module.exports.getBatchInfo = getBatchInfo