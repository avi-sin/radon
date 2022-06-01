const format = function() {
    const hardcodedString = `   I am Avinash Singh, a Trainee At FunctionUp.        `
    const trimmed = hardcodedString.trim()

    console.log("Problem solution 3 :-");
    console.log(`hardcoded string: ` + hardcodedString);
    console.log(`trimmed: ` + trimmed);
    console.log(`to lower case: ` + trimmed.toLowerCase())
    console.log(`to upper case: ` + trimmed.toUpperCase())
}

module.exports.format = format;
