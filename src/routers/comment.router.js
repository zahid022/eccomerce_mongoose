const { Router } = require('express')
const commentController = require('../controllers/comment.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const validationMiddleware = require('../middlewares/validation.middleware')
const commentValidation = require('../validations/comment.validation')

const commentRouter = Router()

commentRouter.post("/", authMiddleware, validationMiddleware(commentValidation.create), commentController.create)
commentRouter.get('/:id', validationMiddleware(commentValidation.get, "query"), commentController.getCommentByProduct)

module.exports = commentRouter