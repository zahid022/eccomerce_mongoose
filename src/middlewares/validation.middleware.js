const { ValidationError } = require("../utils/error.utils")

const validationMiddleware = (schema, type = "body") => {
    return (req, res, next) => {
        let payload = type === "body" ? req.body : req.query
        const validation = schema.validate(payload)

        if (validation.error)
            return next(new ValidationError(validation.error?.details?.[0]?.message));

        if (type === "body") {
            req.body = validation.value
        } else {
            req.query = validation.value
        }
        next()
    }
}

module.exports = validationMiddleware