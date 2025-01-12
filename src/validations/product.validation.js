const Joi = require("joi")

const list = Joi.object({
    categories: Joi.string()
        .custom((value, helpers) => {
            let check = /^([0-9a-fA-F]{24})(,\s*[0-9a-fA-F]{24})*$/.test(value);
            if (!check) return helpers.message("Category ids are not valid");

            let categories = value
                ?.split(",")
                .map((item) => item?.trim())
                .filter((item) => item);
            return categories;
        })
        .message("Categories ids are not valid"),
    tags: Joi.string()
        .custom((value, helpers) => {
            let check = /^([0-9a-fA-F]{24})(,\s*[0-9a-fA-F]{24})*$/.test(value);
            if (!check) return helpers.message("Tag ids are not valid");

            let tags = value
                ?.split(",")
                .map((item) => item?.trim())
                .filter((item) => item);
            return tags;
        })
        .message("Tags ids are not valid"),
    "specs.color": Joi.string().optional(),
    "speecs.size": Joi.string().optional(),
    price: Joi.string().optional(),
    search: Joi.string().optional(),
    page: Joi.string().optional().default(1).min(1),
    limit: Joi.string().optional().default(10).min(1)
})

const create = Joi.object({
    title: Joi.string().trim().required().min(3),
    slug: Joi.string().trim().optional().pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).min(3),
    categories: Joi.array().items(Joi.string()).required(),
    tags: Joi.array().items(Joi.string()).optional(),
    description: Joi.string().required().trim().min(3),
    details: Joi.array().items(Joi.string()).optional(),
    specs: Joi.array()
        .items(
            Joi.object({
                key: Joi.string().trim().required(),
                name: Joi.string().trim().required(),
                values: Joi.array().items(
                    Joi.object({
                        key: Joi.string().required().trim(),
                        value: Joi.string().required().trim(),
                    })
                ),
            })
        )
        .default([]).required(),
})

const upsert = Joi.object({
    specs: Joi.object().pattern(Joi.string().required(), Joi.string().required()).required(),
    price: Joi.number().min(1).required(),
    discount: Joi.number().min(0).optional().default(0),
    discountType: Joi.string().valid("percentage", "value").optional().default("percentage"),
    stock: Joi.number().min(0).optional().default(0),
    slug: Joi.string().trim().optional().pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).min(3),
    images: Joi.array().items(Joi.string()).required()
})

const update = Joi.object({
    title: Joi.string().trim().optional().min(3),
    slug: Joi.string().trim().optional().pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).min(3),
    categories: Joi.array().items(Joi.string()).optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    description: Joi.string().optional().trim().min(3),
    details: Joi.array().items(Joi.string()).optional(),
    specs: Joi.array()
        .items(
            Joi.object({
                key: Joi.string().trim().optional(),
                name: Joi.string().trim().optional(),
                values: Joi.array().items(
                    Joi.object({
                        key: Joi.string().optional().trim(),
                        value: Joi.string().optional().trim(),
                    })
                ),
            })
        )
        .default([]).optional(),
})

const productValidation = {
    list,
    create,
    upsert,
    update
}

module.exports = productValidation