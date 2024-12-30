const { Schema, model } = require("mongoose")

const specSchema = new Schema({
    key: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    values: [
        {
            key: {
                type: String,
                required: true,
                trim: true
            },
            value: {
                type: String,
                required: true,
                trim: true
            }
        }
    ]
})

const variantSchema = new Schema({
    specs: {
        type: Map,
        of: String,
        default: {},
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0
    },
    discountType: {
        type: String,
        enum: ["percentage", "value"],
        default: "percentage"
    },
    stock: {
        type: Number,
        default: 0
    },
    slug: {
        type: String,
        required: true,
        trim: true
    },
    images: {
        type: [Schema.Types.ObjectId],
        ref: "Image",
        required: true
    }
})

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        trim: true
    },
    categories: {
        type: [Schema.Types.ObjectId],
        required: true,
        ref: "Category"
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    details: {
        type: [String],
        default : []
    },
    tags: {
        type: [Schema.Types.ObjectId],
        ref: "Tag",
        default : []
    },
    specs: [specSchema],
    variants: [variantSchema]
}, { timestamps: true })

const Product = model("Product", productSchema)

module.exports = {
    Product,
    variantSchema
}