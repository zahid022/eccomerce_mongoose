const { Schema, model } = require("mongoose")
const { variantSchema } = require("./Product.model")

const orderListSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    },
    variant: variantSchema,
    price: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
})

const orderGroupSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    list: [orderListSchema],
    totalPrice: {
        type: Number,
        required: true
    },
    totalDiscount: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const Order = model("OrderGroup", orderGroupSchema)

module.exports = Order