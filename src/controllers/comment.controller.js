const commentService = require("../services/comment.service")

const create = async (req, res, next) => {
    try {
        let result = await commentService.create(req.user._id, req.body)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const getCommentByProduct = async (req, res, next) => {
    try {
        let {page} = req.query
        let result = await commentService.getCommentByProduct(req.params.id, page)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const commentController = {
    create,
    getCommentByProduct
}

module.exports = commentController