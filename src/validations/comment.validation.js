const Joi = require('joi')

const create = Joi.object({
    productId : Joi.string().required(),
    content : Joi.string().trim().min(1).required()
})

const get = Joi.object({
    page : Joi.string().min(1).optional()
})

const commentValidation = {
    create,
    get
}

module.exports = commentValidation