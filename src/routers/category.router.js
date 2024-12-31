const {Router} = require("express")
const categroyController = require("../controllers/category.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const validationMiddleware = require("../middlewares/validation.middleware")
const categoryValidation = require("../validations/category.validation")
const roleMiddleware = require("../middlewares/role.middleware")

const categoryRouter = Router()

categoryRouter.get("/nested", categroyController.nestedList)
categoryRouter.get("/", categroyController.categories)
categoryRouter.get("/:id", categroyController.category)
categoryRouter.post("/", authMiddleware, roleMiddleware("admin"), validationMiddleware(categoryValidation.create), categroyController.create)
categoryRouter.post("/:id", authMiddleware, roleMiddleware("admin"), validationMiddleware(categoryValidation.update), categroyController.update)
categoryRouter.delete("/:id", authMiddleware, roleMiddleware("admin"), categroyController.deleteCategory)

module.exports = categoryRouter