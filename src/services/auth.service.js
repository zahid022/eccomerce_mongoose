const User = require("../models/User.model")
const { ConflictError, NotFoundError } = require("../utils/error.utils")
const bcrypt = require("bcrypt")
const { encode } = require("../utils/jwt.utils")

const login = async (params) => {
    let user = await User.findOne({ email: params.email }).lean()
    if (!user) throw new NotFoundError("Email or password is wrong")

    let checkPassword = await bcrypt.compare(params.password, user.password)

    if (!checkPassword) throw new NotFoundError("Email or password is wrong")

    let token = encode({ userId: user._id })

    delete user.password

    return {
        token, user
    }
}

const register = async (params) => {
    let checkUser = await User.findOne({ email: params.email })

    if (checkUser) throw new ConflictError("Email is already exists")

    let user = new User(params)

    await user.save()

    return user
}

const update = async (id, params) => {
    let user = await User.findByIdAndUpdate(id, params, { new: true }).lean()
    delete user.password
    return user
}


const authService = {
    register,
    login,
    update
}

module.exports = authService