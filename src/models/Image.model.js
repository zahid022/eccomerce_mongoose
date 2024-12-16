const {Schema, model} = require("mongoose")

const imageSchema = new Schema({
    url : {
        type : String,
        required : true,
        trim : true
    }
}, {timestamps : true})

const ImageModel = model("Image", imageSchema)

module.exports = ImageModel