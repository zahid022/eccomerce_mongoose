const tagService = require("../services/tag.service")

const tags = async (req, res, next) =>{
    try {
        let result = await tagService.tags()
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const create = async (req, res, next) => {
    try {
        let result = await tagService.create(req.body)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        let result = await tagService.update(req.params.id, req.body)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const deleteTag = async (req, res, next) => {
    try {
        await tagService.deleteTag(req.params.id)
        res.json({message : "Tag is deleted successfully"})
    } catch (err) {
        next(err)
    }
}

const tagController = {
    tags,
    create,
    update,
    deleteTag
}

module.exports = tagController