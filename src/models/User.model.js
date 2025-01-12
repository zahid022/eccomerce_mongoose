const {Schema, model} = require("mongoose")
const bcrypt = require("bcrypt")

const userProfile = new Schema({
    addressTitle : {
        type : String,
        default : ''
    },
    country : {
        type : String,
        default : ''
    },
    street : {
        type : String,
        default : ''
    },
    city : {
        type : String,
        default : ''
    },
    postalCode : {
        type : String,
        default : ''
    },
    gender : {
        type : String,
        enum : ["male", "female"]
    },
    state : {
        type : String,
        default : ''
    },
    phone : {
        type : String,
        default : ''
    }
})

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
    role : {
        type : String,
        enum : ["admin", "user"],
        default : "user"
    },
    balance : {
        type : Number,
        default : 100000
    },
    profile: {
        type: userProfile,
        default: {}
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