const {Schema, model} = require("mongoose")

const commentSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    productId : {
        type : Schema.Types.ObjectId,
        ref : 'Product',
        required : true
    },
    content : {
        type : String,
        required : true,
        trim : true
    }
},{timestamps : true})

const Comment = model('Comment', commentSchema)

module.exports = Comment