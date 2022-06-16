const jwt = require("jsonwebtoken");

let decodedToken

const authenticate = async function (req, res, next) {

    try{
        let token = req.headers["x-Auth-token"] || req.headers["x-auth-token"]
        if (!token) return res.status(403).send({ status: false, msg: "token must be present in the request header" });

        decodedToken = jwt.verify(token, 'functionup-radon')
        next()

    } catch (error) {
        res.status(500).send({error: error.message})
    }

}



const authorize = async function (req, res, next) {

    try{
        let userRequested = req.params.userId
        let userLoggedIn = decodedToken.userId

        if (userRequested != userLoggedIn) {
            return res.status(401).send({ status: false, msg: "Logged-in user is not allowed to access the requested user's data" })
        } else {
            next()
        }

    } catch (error) {
        res.status(500).send({error: error.message})
    }
    
}


module.exports.authenticate = authenticate
module.exports.authorize = authorize