const {Router} = require("express")
const authRouter = require("./auth.router")
const categoryRouter = require("./category.router")
const tagRouter = require("./tag.router")
const uploadRouter = require("./upload.router")
const productRouter = require("./product.router")
const cartRouter = require("./cart.router")
const orderRouter = require("./Order.router")
const userRouter = require("./user.router")
const forgetPasswordRouter = require("./forgetPassword.router")
const countryRouter = require("./country.router")

const router = Router()

router.use("/auth", authRouter)
router.use("/user", userRouter)
router.use("/forget_password", forgetPasswordRouter)
router.use("/category", categoryRouter)
router.use("/tag", tagRouter)
router.use("/upload", uploadRouter)
router.use("/product", productRouter)
router.use("/cart", cartRouter)
router.use("/order", orderRouter)
router.use("/country", countryRouter)

module.exports = router