const authService = require("../services/auth.service")

const login = async (req, res, next) => {
    try {
        let result = await authService.login(req.body)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const register = async (req, res, next) => {
    try {
        let result = await authService.register(req.body)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const check = async (req, res, next) => {
    try {
        let result = false
        if(req.user) {
            result = req.user
            result.password = undefined
        }
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const authController = {
    login,
    register,
    check
}

module.exports = authController