const Joi = require("joi")

const create = Joi.object({
    email: Joi.string().email().required()
})

const confirm = Joi.object({
    token: Joi.string().uuid().required(),
    password: Joi.string().required().pattern(/^.{8,}$/),
    repeatPassword: Joi.string().valid(Joi.ref("password")).required()
})

const forgetPasswordValidation = {
    create,
    confirm
}

module.exports = forgetPasswordValidation