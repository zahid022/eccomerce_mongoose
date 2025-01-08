const { Router } = require("express")
const productController = require("../controllers/product.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const roleMiddleware = require("../middlewares/role.middleware")
const validationMiddleware = require("../middlewares/validation.middleware")
const productValidation = require("../validations/product.validation")

const productRouter = Router()

productRouter.get("/", validationMiddleware(productValidation.list, "query"), productController.list)
productRouter.get("/:id", productController.getProduct)
productRouter.get("/slug/:slug", productController.getBySlug)
productRouter.post("/", authMiddleware, roleMiddleware("admin"), validationMiddleware(productValidation.create), productController.create)
productRouter.post("/:id/variant", authMiddleware, roleMiddleware("admin"), validationMiddleware(productValidation.upsert), productController.upsert)
productRouter.post("/:id", authMiddleware, roleMiddleware("admin"), validationMiddleware(productValidation.update), productController.update)
productRouter.delete("/:id", authMiddleware, roleMiddleware("admin"), productController.deleteProduct)

module.exports = productRouter