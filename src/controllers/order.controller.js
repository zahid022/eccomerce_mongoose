const orderService = require("../services/order.service")

const list = async (req, res, next) => {
    try {
        let result = await orderService.list(req.user._id)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const create = async (req, res, next) => {
    try {
        let result = await orderService.create(req.user, req.body)
        res.json(result)
    } catch (err) {
        next(err)
    }
}


const orderController = {
    list,
    create
}

module.exports = orderController