const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const validationMiddleware = require("../middlewares/validation.middleware");
const userController = require("../controllers/user.controller");
const userValidation = require("../validations/user.validation");

const userRouter = Router()

userRouter.post("/update", authMiddleware, validationMiddleware(userValidation.update), userController.update)
userRouter.post("/password", authMiddleware, validationMiddleware(userValidation.resetPassword), userController.resetPassword)

module.exports = userRouter