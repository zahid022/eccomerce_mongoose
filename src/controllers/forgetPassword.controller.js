const forgetPasswordService = require("../services/forgetPassword.service")

const sendActivationToken = async (req, res, next) => {
    try {
        let result = await forgetPasswordService.sendActivationToken(req.body)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const confirmToken = async (req, res, next) => {
    try {
        let result = await forgetPasswordService.confirmToken(req.body)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const forgetPasswordController = {
    sendActivationToken,
    confirmToken
}

module.exports = forgetPasswordController