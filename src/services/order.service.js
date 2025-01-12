const { default: mongoose } = require("mongoose")
const Order = require("../models/Order.model")
const { Product } = require("../models/Product.model")
const { NotFoundError, BadRequestError } = require("../utils/error.utils")
const User = require("../models/User.model")
const cartService = require("./cart.service")

const list = async (id) => {
    let result = await Order.find({ userId: id }).sort({ createdAt: -1 }).populate('list.product').populate('list.variant.images')

    return result || []
}

const create = async (user, params) => {
    let productIds = params.list.map(item => {
        if (!mongoose.Types.ObjectId.isValid(item.productId)) {
            throw new BadRequestError(`Invalid productId: ${item.productId}`);
        }
        return new mongoose.Types.ObjectId(item.productId);
    });

    let products = await Product.find({ _id: { $in: productIds } })

    if (!products) {
        throw new NotFoundError("Product is not found")
    }

    if (products.length !== productIds.length) {
        throw new NotFoundError("Product is not found")
    }

    let totalPrice = 0
    let totalDiscount = 0

    let orders = params.list.map(item => {
        let product = products.find(productItem => productItem._id.toString() === item.productId)

        let variant = product.variants.find(variantItem => variantItem._id.toString() === item.variantId)

        if (!variant) {
            throw new NotFoundError("Product variant is not found")
        }

        if (variant.stock < item.count) {
            throw new BadRequestError(`"${variant.slug}" is out of stock`);
        }

        variant.stock -= item.count

        let price = variant.price * item.count

        totalPrice += price

        if (variant.discountType === "percentage") {
            totalDiscount += Math.floor((price * variant.discount) / 100)
        } else {
            totalDiscount += Math.floor(variant.discount * item.count)
        }

        return {
            product: product._id,
            product_name: product.title,
            variant: variant,
            price: variant.price,
            count: item.count
        }

    })
    let payAmount = totalPrice - totalDiscount

    if (user.balance < payAmount) {
        throw new BadRequestError("Insufficent balance")
    }

    await Promise.all(products.map(item => item.save()))

    let orderGroup = new Order({
        list: orders,
        totalDiscount,
        totalPrice,
        userId: user._id
    })

    await orderGroup.save()

    await User.updateOne({ _id: user._id }, { $inc: { balance: -payAmount } });

    await cartService.deleteUserCart(user._id)

    let result = orderGroup.toObject();
    delete result.userId;
    return result;
}

const orderService = {
    list,
    create
}

module.exports = orderService