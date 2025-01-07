const countryService = require("../services/country.service")

const list = async (req, res, next) => {
    try {
        let result = await countryService.list()
        res.json(result)
    } catch (err) {
        next(err)
    }
}

const countryController = {
    list
}

module.exports = countryController