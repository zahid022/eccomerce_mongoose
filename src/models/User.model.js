const {Schema, model} = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new Schema({
    firstName : {
        type : String,
        required : true,
        trim : true
    },
    lastName : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        uniquie : true
    },
    password : {
        type : String,
        required : true
    },
    addressTitle : {
        type : String
    },
    country : {
        type : String
    },
    street : {
        type : String
    },
    city : {
        type : String
    },
    postalCode : {
        type : String
    },
    gender : {
        type : String,
        enum : ["male", "female"]
    },
    role : {
        type : String,
        enum : ["admin", "user"],
        default : "user"
    },
    state : {
        type : String
    },
    balance : {
        type : Number,
        default : 0
    },
    phone : {
        type : String
    }
}, {timestamps : true})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) next()

    const hash = await bcrypt.hash(this.password, 10)

    this.password = hash

    next()
})

const User = model("User", userSchema)

module.exports = User