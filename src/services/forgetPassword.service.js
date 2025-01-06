const uuid = require("uuid")
const dateFns = require("date-fns")
const User = require("../models/User.model")
const { NotFoundError, ValidationError, BadRequestError } = require("../utils/error.utils")
const Activation = require("../models/Activation.model")
const renderTemplate = require("../utils/template.utils")
const config = require("../config")
const { sendMail } = require("../utils/mail.utils")

const sendActivationToken = async (params) => {
    let user = await User.findOne({ email: params.email })

    if (!user) throw new NotFoundError("User is not found")

    let token = uuid.v4()

    await Activation.create({
        token,
        expire_time: dateFns.addMinutes(new Date(), 10),
        UserId: user._id
    })

    let content = await renderTemplate("reset-password", {
        name: user.firstName,
        websiteUrl: config.websiteURL,
        activationUrl: `${config.websiteURL}/forget_password?token=${token}`
    })

    await sendMail(config.smtp.from, user.email, "reset-password", content)

    return {
        message: "Message send to email"
    }
}

const confirmToken = async (params) => {
    let activation = await Activation.findOne({
        token: params.token,
        expire_time: { $gte: new Date() },
    })

    if (!activation) throw new BadRequestError("Token is wrong")

    let user = await User.findById(activation.UserId)

    if (!user) throw new NotFoundError("user is not found")

    if (params.password !== params.repeatPassword) {
        throw new ValidationError("Repeat password is wrong")
    }

    user.password = params.password

    await user.save()

    await activation.deleteOne()

    return {
        message: "User password is successsfully updated",
    };

}

const forgetPasswordService = {
    sendActivationToken,
    confirmToken
}

module.exports = forgetPasswordService