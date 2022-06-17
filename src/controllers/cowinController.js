let axios = require("axios")


let getStates = async function (req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getDistricts = async function (req, res) {
    try {
        let id = req.params.stateId
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getByPin = async function (req, res) {
    try {
        let pin = req.query.pincode
        let date = req.query.date
        console.log(`query params are: ${pin} ${date}`)
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getOtp = async function (req, res) {
    try {
        let blahhh = req.body
        
        console.log(`body is : ${blahhh} `)
        var options = {
            method: "post",
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
            data: blahhh
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}



// ========================= 1 ============================= //

let getByDistrictId = async function (req, res) {
    try {
        let districtId = req.query.district_id
        let date = req.query.date
        
        console.log(`query params are : ${districtId} and ${date} `)
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtId}&date=${date}`
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}



// ================================ 2 (a) =============================== //

let getWeather = async function (req, res) {
    try {
        let city = req.query.q
        let api_key = req.query.appid
        
        console.log(`query params are : ${city} and ${api_key} `)
        var options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}



// ================================ 2 (b) =============================== //

let getTemp = async function (req, res) {
    try {
        let city = req.query.q
        let api_key = req.query.appid
        
        console.log(`query params are : ${city} and ${api_key} `)
        var options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: `The temperature in ${city} is ${result.data.main.temp} K`})
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}



// =================================== 2 (c) ========================================= //

let sortByTemp = async (req, res) => {
    try {
        let cities = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let api_key = `18961d6334b5404df2fb201cd7ad45fe`
        let finalRes = []

        for (let i = 0; i < cities.length; i++) {
            var options = {
                method: "get",
                url: `http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=${api_key}`
            }
            let result = await axios(options)
            let data = {"city": `${result.data.name}`, "temp": `${result.data.main.temp}`}
            finalRes.push(data)
        }
        // console.log(finalRes);
        finalRes.sort((a, b) => a.temp - b.temp)
        res.status(200).send({ msg: finalRes })
    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}



let myMeme = async (req, res) => {
    let template_id = req.query.template_id
    let text0 = req.query.text0
    let text1 = req.query.text1
    // let text2 = req.query.text2
    // let text3 = req.query.text3
    let username = req.query.username
    let password = req.query.password

    var options = {
        method: "post",
        url: `https://api.imgflip.com/caption_image?template_id=${template_id}&text0=${text0}&text1=${text1}&username=${username}&password=${password}`,
        data: req.query
    }

    let result = await axios(options)
    // console.log(result)
    // res.status(200).send({ msg: result})
    console.log(result.data)
    res.status(200).send({ data: result.data.data})

}


module.exports.getStates = getStates
module.exports.getDistricts = getDistricts
module.exports.getByPin = getByPin
module.exports.getOtp = getOtp
module.exports.getByDistrictId = getByDistrictId
module.exports.getWeather = getWeather
module.exports.getTemp = getTemp
module.exports.sortByTemp = sortByTemp
module.exports.myMeme = myMeme