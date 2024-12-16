const {Product} = require("../models/Product.model")
const { findById } = require("../models/User.model")
const { NotFoundError, ValidationError } = require("../utils/error.utils")
const generateSlug = require("../utils/slug.utils")

const list = async (filter = {}) => {
    let query = Product.find()

    let where = {}

    if(filter.categories){
        where.categories = {
            $in : filter.categories
        }
    }

    if(filter.search){
        where.$and = [
            {
                $or : [
                    {
                        title : {$regex : filter.search, $optios : "i"}
                    },
                    {
                        description : {$regex : filter.search, $optios : "i"}
                    }
                ]
            }
        ]
    }

    for(let [key,value] of Object.entries(filter)){
        if(["categories", "search", "page", "limit"].includes(key)) continue
        if(value[0] === "["){
            let [min, max] = value.slice(1, -1).split(",").map(item => +item.trim())

            where[`variants.${key}`] = {
                $lte : max,
                $gte : min
            }
        }else if(value[0] === '<'){
            where[`variants.${key}`] = {
                $lte : value.slice(1)
            }
        }else if(value[0] === '>'){
            where[`variants.${key}`] = {
                $gte : value.slice(1)
            }
        }else if(value.includes(",")){
            where[`variants.${key}`] = {
                $in : value.split(",").map(item => item.trim())
            }
        }else{
            where[`variants.${key}`] = value
        }
    }

    query.where(where)
    query.limit(filter.limit || 10)
    query.skip(filter.limit * (filter.page - 1))
    query.populate("categories")
    query.populate("tags")
    query.populate("variants.images")

    let products = await query

    const total = await Product.countDocuments(where)

    return {
        total,
        limit : filter.limit || 10,
        page : filter.page || 1,
        products
    }
}

const getProduct = async (id) => {
    let product = await Product.findById(id).populate("categories").populate("tags").populate("variants.images")

    if(!product) throw new NotFoundError("Product is not found")

    return product
}

const create = async (params) => {
    params.slug = params.slug || generateSlug(params.title)

    let product = new Product(params)

    await product.save()

    return product
}

const upsert = async (id, params) => {
    const product = await Product.findById(id)

    if (!product) throw new NotFoundError("Product is not found")

    Object.entries(params.specs).some(([key, value]) => {
        let keyCheck = product.specs.find(item => item.key === key)
        if (!keyCheck) throw new ValidationError(`${key} spec is not found`)

        let valueCheck = keyCheck.values.some(item => item.key === value)
        if (!valueCheck) throw new ValidationError(`${value} spec is not found`)
    })

    product.variants = product.variants || []
    let checkVariant = product.variants.find(variant => {
        return Object.entries(Object.fromEntries(variant.specs)).every(([key, value]) => {
            return params.specs[key] === value
        })
    })

    params.slug = params.slug || generateSlug(`${Object.values(params.specs).join("-")}`)

    if (checkVariant) {
        for (let [key, value] of Object.entries(params)) {
            checkVariant[key] = value
        }
    } else {
        product.variants.push(params)
    }
    await product.save()

    return product
}

const update = async (id, params) => {
    if(params.title){
        params.slug = params.slug || generateSlug(params.title)
    }
    const product = await Product.findById(id)

    for(let [key, value] of Object.entries(params)){
        product[key] = value
    }

    product.save()

    return product
}

const deleteProduct = async (id) => {
    await Product.findByIdAndDelete(id)

    return true
}

const productService = {
    list,
    getProduct,
    create,
    upsert,
    update,
    deleteProduct
}

module.exports = productService