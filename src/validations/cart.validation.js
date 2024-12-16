const Joi = require("joi")

const create = Joi.object({
    list: Joi.object({
        productId: Joi.string().required(),
        variantId: Joi.string().required(),
        count: Joi.number().min(1).required()
    }).required()
})

const cartValidation = {
    create
}

module.exports = cartValidation