const {Router} = require("express")
const tagController = require("../controllers/tag.controller")
const validationMiddleware = require("../middlewares/validation.middleware")
const tagValidation = require("../validations/tag.validation")
const authMiddleware = require("../middlewares/auth.middleware")
const roleMiddleware = require("../middlewares/role.middleware")

const tagRouter = Router()

tagRouter.get("/", tagController.tags)
tagRouter.post("/",authMiddleware, roleMiddleware("admin"), validationMiddleware(tagValidation.create), tagController.create)
tagRouter.post("/:id", authMiddleware, roleMiddleware("admin"),validationMiddleware(tagValidation.update), tagController.update)
tagRouter.delete("/:id", authMiddleware, roleMiddleware("admin"), tagController.deleteTag)

module.exports = tagRouter