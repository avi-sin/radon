const jwt = require("jsonwebtoken");

let decodedToken

const authenticate = async function (req, res, next) {
    let token = req.headers["x-Auth-token"] || req.headers["x-auth-token"]

    //If no token is present in the request header return error
    if (!token) return res.send({ status: false, msg: "token must be present in the request header" });

    // ================================================================================= //
    decodedToken = jwt.verify(token, 'functionup-radon')
    
    if(!decodedToken) return res.send({status: false, msg:"token is not valid"})
    // ================================================================================= //
    
    /*

     jwt.verify(token, 'functionup-radon', (err,decode)=>{
        if(err){
            res.send({message:err.message})
        }else{
            req.decodedToken=decode
        }
     })

    */

    next()
}




const authorize = async function (req, res, next) {
    let userRequested = req.params.userId

    //userId for the logged-in user

    let userLoggedIn = decodedToken.userId
    // let userLoggedIn = req.decodedToken.userId

    //userId comparision to check if the logged-in user is requesting for their own data
    if (userRequested != userLoggedIn) {
        return res.send({ status: false, msg: "Logged-in user is not allowed to access the requested user's data" })
    } else {
        next()
    }
}


module.exports.authenticate = authenticate
module.exports.authorize = authorize