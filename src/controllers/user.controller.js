const userService = require("../services/user.service")

const update = async (req, res, next) => {
    try {
        let result = await userService.update(req.user._id, req.body)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const resetPassword = async (req, res, next) => {
    try {
        let result = await userService.resetPassword(req.user._id, req.body)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const userController = {
    update,
    resetPassword
}

module.exports = userController