const Joi = require("joi")

const create = Joi.object({
    list: Joi.array().items(
        Joi.object({
            productId: Joi.string().required(),
            variantId: Joi.string().required(),
            count: Joi.number().required().min(1),
        })
    ).required()
})


const orderValidation = {
    create
}

module.exports = orderValidation