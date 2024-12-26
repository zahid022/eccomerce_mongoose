const { Schema, model } = require("mongoose")

const ActivationSchema = new Schema({
    token : {
        type : String,
        required : true,
        trim : true
    },
    UserId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    expire_time : {
        type : Date,
        required : true
    }
}, { timestamps: true })

const Activation = model("Activation", ActivationSchema)

module.exports = Activation