const {Router} = require("express")
const authController = require("../controllers/auth.controller")
const validationMiddleware = require("../middlewares/validation.middleware")
const authValidation = require("../validations/auth.validation")


const authRouter = Router()

authRouter.post("/register", validationMiddleware(authValidation.register), authController.register)
authRouter.post("/login", validationMiddleware(authValidation.login), authController.login)

module.exports = authRouter