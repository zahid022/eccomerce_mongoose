const Tag = require("../models/Tag.model")
const { NotFoundError } = require("../utils/error.utils")
const generateSlug = require("../utils/slug.utils")

const tags = async () => {
    let tags = await Tag.find()
    return tags
}

const create = async (params) => {
    if (params.name) {
        params.slug = params.slug || generateSlug(params.name)
    }

    let tag = new Tag(params)

    await tag.save()

    return tag
}

const update = async (id, params) => {
    let tag = await Tag.findById(id)

    if (!tag) throw new NotFoundError("Tag is not found")

    if (params.name) {
        params.slug = params.slug || generateSlug(params.name)
    }

    for(let [key, value] of Object.entries(params)){
        tag[key] = value
    }

    await tag.save()

    return tag
}

const deleteTag = async (id) => {
    await Tag.findByIdAndDelete(id)

    return true
}

const tagService = {
    tags,
    create,
    update,
    deleteTag
}

module.exports = tagService