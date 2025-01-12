const Cart = require("../models/Cart.model")
const { Product } = require("../models/Product.model")
const { NotFoundError, BadRequestError } = require("../utils/error.utils")

const list = async (id) => {
    let cart = await Cart.findOne({ userId: id }).populate({
        path: "list.productId",
        populate: {
            path: "variants.images",
        },
    }).lean()

    let result = { ...cart, userId: undefined }

    return result || []
}

const create = async (id, params) => {
    let cart = await Cart.findOne({ userId: id })

    let product = await Product.findById(params.list.productId)

    if (!product) throw new NotFoundError("Product is not found")

    let variant = product.variants.find(item => item.id.toString() === params.list.variantId)

    if (!variant) throw new NotFoundError("Variant is not found")

    params.list.price = variant.price
    params.list.discount = variant.discountType === "percentage" ? Math.floor((variant.price * variant.discount) / 100) : variant.discount

    let totalPrice = 0
    let totalDiscount = 0

    if (cart) {
        let productCheck = cart.list.some(item => item.productId.toString() === params.list.productId)

        if (productCheck) {
            let variantCheck = cart.list.find(item => item.variantId.toString() === params.list.variantId)

            if (variantCheck) {
                variantCheck.count = params.list.count
                variantCheck.price = params.list.price
                variantCheck.discount = params.list.discount
            } else {
                cart.list.push(params.list)
            }
        } else {
            cart.list.push(params.list)
        }

        cart.list.forEach(item => {
            totalPrice += (item.price * item.count)
            totalDiscount += (item.discount * item.count)
        })

        cart.totalPrice = totalPrice
        cart.totalDiscount = totalDiscount

        await cart.save()

        let result = cart.toObject();
        delete result.userId;
        return result;
    } else {
        let newCart = new Cart({
            userId: id,
            list: [params.list],
            totalPrice: (params.list.price * params.list.count),
            totalDiscount: (params.list.discount * params.list.count)
        })

        await newCart.save()

        let result = newCart.toObject();
        delete result.userId;
        return result;
    }
}

const deleteItem = async (userId, id) => {
    let cart = await Cart.findOne({ userId: userId })

    if (!cart) throw new BadRequestError("Your cart is empty")

    let result = cart.list.filter(item => item._id.toString() !== id)

    if (result.length === cart.list.length) {
        throw new NotFoundError("Product is not found in your cart")
    }

    cart.list = result

    await cart.save()

    return cart
}

const deleteUserCart = async (userId) => {
    await Cart.findOneAndDelete({userId})
}

const cartService = {
    list,
    create,
    deleteItem,
    deleteUserCart
}

module.exports = cartService