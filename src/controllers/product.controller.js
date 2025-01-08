const productService = require("../services/product.service")

const list = async (req, res, next) => {
    try {
        let result = await productService.list(req.query)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const getProduct = async (req, res, next) => {
    try {
        let result = await productService.getProduct(req.params.id)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const getBySlug = async (req, res, next) => {
    try {
        let result = await productService.getBySlug(req.params.slug)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const create = async (req, res, next) => {
    try {
        let result = await productService.create(req.body)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const upsert = async (req, res, next) => {
    try {
        let result = await productService.upsert(req.params.id, req.body)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        let result = await productService.update(req.params.id, req.body)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        await productService.deleteProduct(req.params.id)
        res.json({message : "Product is deleted successfully"})
    } catch (err) {
        next(err)
    }
}

const productController = {
    list,
    getProduct,
    getBySlug,
    create,
    upsert,
    update,
    deleteProduct
}

module.exports = productController