const Comment = require("../models/Comment.model")
const { NotFoundError } = require("../utils/error.utils")
const { getProduct } = require("./product.service")

const create = async (id, params) => {
    const { productId, content } = params

    const product = await getProduct(productId)

    if (!product) {
        throw new NotFoundError("Product is not found")
    }

    const comment = new Comment({
        content,
        productId,
        userId: id
    })

    await comment.save()

    return comment
}

const getCommentByProduct = async (productId, page = 1) => {
    const limit = 5
    const skip = (page - 1) * limit;

    const total = await Comment.countDocuments({ productId });
    const comments = await Comment.find({ productId })
        .populate({
            path: 'userId',
            select: 'firstName lastName'
        })
        .limit(limit)
        .skip(skip);

    return {
        total,
        comments: comments || [],
    };
};

const commentService = {
    create,
    getCommentByProduct
}

module.exports = commentService