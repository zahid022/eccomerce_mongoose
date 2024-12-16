const Joi = require("joi")

const login = Joi.object({
    email : Joi.string().email().required(),
    password : Joi.string().pattern(/^.{8,}$/).required()
})

const register = Joi.object({
    firstName : Joi.string().trim().min(3).required(),
    lastName : Joi.string().trim().min(3).required(),
}).concat(login)

const update = Joi.object({
    firstName : Joi.string().trim().min(3).optional(),
    lastName : Joi.string().trim().min(3).optional(),
    addressTitle : Joi.string().trim().min(3).optional(),
    phone : Joi.string().optional().trim(),
    state : Joi.string().trim().min(3).optional(),
    gender : Joi.string().valid("male", "female").optional(),
    postalCode : Joi.string().trim().min(3).optional(),
    city : Joi.string().trim().min(3).optional(),
    street : Joi.string().trim().min(3).optional(),
    country : Joi.string().trim().min(3).optional()
})

const authValidation = {
    register,
    login,
    update
}

module.exports = authValidation