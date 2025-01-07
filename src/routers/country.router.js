const {Router} = require("express")
const countryController = require("../controllers/country.controller")

const countryRouter = Router()

countryRouter.get("/", countryController.list)

module.exports = countryRouter