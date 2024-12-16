const Joi = require("joi")

const create = Joi.object({
    name : Joi.string().trim().required(),
    slug : Joi.string().trim().optional(),
    parentId : Joi.string().trim().optional(),
    order : Joi.number().min(0).optional()
})

const update = Joi.object({
    name : Joi.string().trim().optional(),
    slug : Joi.string().trim().optional(),
    parentId : Joi.string().trim().optional(),
    order : Joi.number().min(0).optional()
})


const categoryValidation = {
    create,
    update
}

module.exports = categoryValidation