const UserModel= require("../models/userModel")
const ProductModel = require("../models/productModel")

const mid1= function ( req, res, next) {
    req.falana= "hi there. i am adding something new to the req object"
    console.log("Hi I am a middleware named Mid1")
    next()
}

const mid2= function ( req, res, next) {
    // let data = req.headers
    let isFreeAppUser = req.headers['isfreeappuser']

    if (isFreeAppUser) {
        // console.log(isFreeAppUser);
        next()
    } else {
        res.send({msg: "The request is missing a mandatory header."})
        // next()
    }
}

const mid3= async function ( req, res, next) {
    // console.log("Hi I am a middleware named Mid3")
    let isFreeAppUser = req.headers['isfreeappuser']

    if (isFreeAppUser) {
        // console.log(isFreeAppUser);
        let uId = await UserModel.findById(req.body.userId)
        let pId = await ProductModel.findById(req.body.productId)
        if (uId == null) {
            res.send({msg: "userId is invalid."})
        } else {
            if (pId == null) {
                res.send({msg: "productId is invalid"})
            } else {
                next()
            }
        }
    } else {
        res.send({msg: "The request is missing a mandatory header."})
        // next()
    }
}

const mid4= function ( req, res, next) {
    // console.log("Hi I am a middleware named Mid4")
    if (req.headers['isfreeappuser'] == true) {
        
    }
    next()
}


module.exports.mid1= mid1
module.exports.mid2= mid2
module.exports.mid3= mid3
module.exports.mid4= mid4
