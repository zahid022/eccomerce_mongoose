const { ForbiddenError } = require("../utils/error.utils")

const roleMiddleware = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) return next(new ForbiddenError(`your role is not ${roles[0]}`))
        next()
    }
}

module.exports = roleMiddleware