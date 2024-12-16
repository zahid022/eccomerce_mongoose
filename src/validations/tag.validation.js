const Joi = require("joi")

const create = Joi.object({
    name : Joi.string().min(2).required(),
    slug : Joi.string().min(2).optional()
})

const update = Joi.object({
    name : Joi.string().min(2).optional(),
    slug : Joi.string().min(2).optional()
})

const tagValidation = {
    create,
    update
}

module.exports = tagValidation