const {Schema, model} = require("mongoose")

const listSchema = new Schema({
    productId : {
        type : Schema.Types.ObjectId,
        ref : "Product",
        required : true
    },
    variantId : {
        type : Schema.Types.ObjectId,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    discount : {
        type : Number,
        default : 0
    },
    count : {
        type : Number,
        required : true
    }
})

const cartSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        required : true
    },
    list : [listSchema],
    totalPrice : {
        type : Number,
        required : true
    },
    totalDiscount : {
        type : Number,
        default : 0
    }
}, {timestamps : true})

const Cart = model("Cart", cartSchema)

module.exports = Cart