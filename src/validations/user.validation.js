const Joi = require("joi")

const update = Joi.object({
    firstName: Joi.string().trim().min(3).optional(),
    lastName: Joi.string().trim().min(3).optional(),
    profile: Joi.object({
        addressTitle: Joi.string().trim().min(3).optional(),
        phone: Joi.string().optional().trim(),
        state: Joi.string().trim().min(3).optional(),
        gender: Joi.string().valid("male", "female").optional(),
        postalCode: Joi.string().trim().min(3).optional(),
        city: Joi.string().trim().min(3).optional(),
        street: Joi.string().trim().min(3).optional(),
        country: Joi.string().trim().min(3).optional()
    })
})

const resetPassword = Joi.object({
    currentPassword: Joi.string().pattern(/^.{8,}$/).required(),
    newPassword: Joi.string().pattern(/^.{8,}$/).required(),
    repeatPassword: Joi.string().valid(Joi.ref("newPassword")).required()
})

const userValidation = {
    update,
    resetPassword
}

module.exports = userValidation