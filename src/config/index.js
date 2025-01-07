const dotenv = require("dotenv")
const path = require("path")

const envPath = path.join(__dirname, "../../.env")

dotenv.config({ path: envPath })

module.exports = {
    port: process.env.PORT,
    databaseURL: process.env.DATABASE_URL,
    websiteURL : process.env.WEBSITE_URL,
    secretKEY: process.env.SECRET_KEY,
    cloudNAME: process.env.CLOUDINARY_CLOUD_NAME,
    cloudKey: process.env.CLOUDINARY_API_KEY,
    cloudSECRET : process.env.CLOUDINARY_API_SECRET,
    countryURL : process.env.COUNTRY_WEBSITE,
    smtp : {
        host : process.env.SMTP_HOST,
        port : +process.env.SMTP_PORT || 587,
        secure : process.env.SMTP_SECURE == 1,
        from : process.env.SMTP_FROM,
        user : process.env.SMTP_USER,
        pass : process.env.SMTP_PASS
    }
}