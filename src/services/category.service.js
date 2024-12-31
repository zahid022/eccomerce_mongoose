const Category = require("../models/Category.model")
const { NotFoundError } = require("../utils/error.utils")
const generateSlug = require("../utils/slug.utils")

const categories = async () => {
    let list = await Category.find().sort({ order: 1 }).lean()

    return list
}

const nestedList = async () => {
    let list = await Category.find().sort({ order: 1 }).lean()

    let result = list
        .filter(item => !item.parentId)
        .map(item => subCategories(list, item))

    return result
}

const subCategories = (list, category) => {
    let children = list
        .filter(item => item.parentId?.toString() === category._id.toString())
        .map(element => subCategories(list, element))

    return {
        ...category,
        children: children.length ? children : undefined
    }
}

const category = async (id) => {
    let category = await Category.findById(id)

    if(!category) throw new NotFoundError("Category is not found")

    return category
}

const create = async (params) => {
    params.slug = params.slug || generateSlug(params.name)

    let category = new Category(params)

    await category.save()

    return category
}

const update = async (id, params) => {
    let category = await Category.findById(id)

    if(!category) throw new NotFoundError("Category is not found")

    if(params.name){
        params.slug = params.slug || generateSlug(params.name)
    }

    for(let [key, value] of Object.entries(params)){
        category[key] = value
    }

    await category.save()

    return category
}

const deleteCategory = async (id) => {
    let result = await Category.findOneAndDelete({ _id: id })

    if(!result) throw new NotFoundError("category is not found")

    return true
}

const categoryService = {
    categories,
    nestedList,
    category,
    create,
    update,
    deleteCategory
}

module.exports = categoryService