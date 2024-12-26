const Joi = require("joi")

const login = Joi.object({
    email : Joi.string().email().required(),
    password : Joi.string().pattern(/^.{8,}$/).required()
})

const register = Joi.object({
    firstName : Joi.string().trim().min(3).required(),
    lastName : Joi.string().trim().min(3).required(),
}).concat(login)

const authValidation = {
    register,
    login
}

module.exports = authValidation