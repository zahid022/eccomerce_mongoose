const jwt = require("jsonwebtoken")
const config = require("./../config/index")

const encode = (payload) => {
    let token = jwt.sign(payload, config.secretKEY, {expiresIn : "1d"})

    return token
}

const decode = (token) => {
    try {
        let userId = jwt.verify(token, config.secretKEY)
        
        return userId
    } catch {
        return false
    }
}

module.exports = {
    encode,
    decode
}