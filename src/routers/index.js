const {Router} = require("express")
const authRouter = require("./auth.router")
const categoryRouter = require("./category.router")
const tagRouter = require("./tag.router")
const uploadRouter = require("./upload.router")
const productRouter = require("./product.router")
const cartRouter = require("./cart.router")
const orderRouter = require("./Order.router")

const router = Router()

router.use("/auth", authRouter)
router.use("/category", categoryRouter)
router.use("/tag", tagRouter)
router.use("/upload", uploadRouter)
router.use("/product", productRouter)
router.use("/cart", cartRouter)
router.use("/order", orderRouter)

module.exports = router