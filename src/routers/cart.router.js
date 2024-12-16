const {Router} = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const cartController = require("../controllers/cart.controller")
const validationMiddleware = require("../middlewares/validation.middleware")
const cartValidation = require("../validations/cart.validation")

const cartRouter = Router()

cartRouter.get("/", authMiddleware, cartController.list)
cartRouter.post("/", authMiddleware, validationMiddleware(cartValidation.create), cartController.create)
cartRouter.delete("/:id", authMiddleware, cartController.deleteItem)

module.exports = cartRouter