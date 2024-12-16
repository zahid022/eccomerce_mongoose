const cartService = require("../services/cart.service")

const list = async (req, res, next) => {
    try {
        let result = await cartService.list(req.user._id)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const create = async (req, res, next) => {
    try {
        let result = await cartService.create(req.user._id, req.body)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const deleteItem = async (req, res, next) => {
    try {
        let result = await cartService.deleteItem(req.user._id, req.params.id)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const cartController = {
    list,
    create,
    deleteItem
}

module.exports = cartController