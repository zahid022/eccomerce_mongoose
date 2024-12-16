const categoryService = require("../services/category.service")

const categories = async (req, res, next) => {
    try {
        let result = await categoryService.categories()
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const create = async (req, res, next) => {
    try {
        let result = await categoryService.create(req.body)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        let result = await categoryService.update(req.params.id, req.body)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        await categoryService.deleteCategory(req.params.id)
        res.json({message : "Category is deleted successfully"})
    } catch (err) {
        next(err)
    }
}


const categroyController = {
    categories,
    create,
    update,
    deleteCategory
}

module.exports = categroyController