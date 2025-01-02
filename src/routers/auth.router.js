const {Router} = require("express")
const authController = require("../controllers/auth.controller")
const validationMiddleware = require("../middlewares/validation.middleware")
const authValidation = require("../validations/auth.validation")
const authMiddleware = require("../middlewares/auth.middleware")

const authRouter = Router()

authRouter.post("/register", validationMiddleware(authValidation.register), authController.register)
authRouter.post("/login", validationMiddleware(authValidation.login), authController.login)
authRouter.get("/check", authMiddleware, authController.check)

module.exports = authRouter