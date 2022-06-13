const ProductModel = require("../models/productModel")

const createProduct = async function (req, res) {
    let data = req.body
    let productCreated = await ProductModel.create(data)
    res.send(productCreated)
}

module.exports.createProduct = createProduct