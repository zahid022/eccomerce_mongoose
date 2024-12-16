const User = require("../models/User.model")
const { UnauthorizedError } = require("../utils/error.utils")
const { decode } = require("../utils/jwt.utils")

const authMiddleware = async (req, res, next) => {
    let token = req.headers.authorization

    if (!token) return next(new UnauthorizedError("unauthorized"))

    token = token.split(" ")[1]

    if (!token) return next(new UnauthorizedError("unauthorized"))

    let payload = decode(token)

    if (!payload?.userId) return next(new UnauthorizedError("unauthorized"));

    let user = await User.findById(payload.userId)

    if (!user) return next(new UnauthorizedError("Token is invalid"))

    req.user = user

    next()
}

module.exports = authMiddleware