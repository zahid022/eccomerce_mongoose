const User = require("../models/User.model")
const { NotFoundError, BadRequestError, ValidationError } = require("../utils/error.utils")
const bcrypt = require("bcrypt")

const update = async (id, params) => {
    let user = await User.findByIdAndUpdate(id, params, { new: true }).lean()

    delete user.password
    
    return user
}

const resetPassword = async (id, params) => {
    const {currentPassword, newPassword, repeatPassword} = params

    let user = await User.findById(id)

    if(!user) throw new NotFoundError("User is not found")

    let checkPassword = await bcrypt.compare(currentPassword, user.password)

    if(!checkPassword) throw new BadRequestError("Password is wrong")

    if(newPassword !== repeatPassword){
        throw new ValidationError("Repeat password is wrong")
    }
    
    user.password = newPassword

    await user.save()

    return {
        message : "Password is successfully updated"
    }
}

const userService = {
    update,
    resetPassword
}

module.exports = userService