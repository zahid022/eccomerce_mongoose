const ImageModel = require('../models/Image.model');
const { ValidationError } = require('../utils/error.utils');

const cloudinary = require('cloudinary').v2;

const uploadToCloudinary = (buffer, filename) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type: 'auto',
                public_id: filename,
                folder: 'uploads',
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        stream.end(buffer);
    });
};

const uploadImage = async (file) => {
    if (!file) {
        throw new ValidationError("File is not found")
    }

    const result = await uploadToCloudinary(file.buffer, `${Date.now()}-${file.originalname}`);

    let res = await create(result)

    return res
}

const create = async (result) => {
    if(result.secure_url){
        let image = new ImageModel({url : result.secure_url})

        await image.save()

        return image
    }
}

const uploadService = { uploadImage }

module.exports = uploadService