const uploadService = require("../services/upload.service");

const uploadImage = async (req, res, next) => {
    try {
        let result = await uploadService.uploadImage(req.file)
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const uploadController = { uploadImage }

module.exports = uploadController