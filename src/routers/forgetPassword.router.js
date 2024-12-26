const { Router } = require("express")
const forgetPasswordController = require("../controllers/forgetPassword.controller")
const validationMiddleware = require("../middlewares/validation.middleware")
const forgetPasswordValidation = require("../validations/forgetPassword.validation")

const forgetPasswordRouter = Router()

forgetPasswordRouter.post("/", validationMiddleware(forgetPasswordValidation.create), forgetPasswordController.sendActivationToken)
forgetPasswordRouter.post("/confirm", validationMiddleware(forgetPasswordValidation.confirm), forgetPasswordController.confirmToken)

module.exports = forgetPasswordRouter