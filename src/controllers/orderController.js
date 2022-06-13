const OrderModel = require("../models/orderModel")

const createOrder = async function (req, res) {
    let data = req.body
    data.isFreeAppUser = req.headers['isfreeappuser']
    let orderCreated = await OrderModel.create(data)
    res.send({orderCreated})
}

module.exports.createOrder = createOrder