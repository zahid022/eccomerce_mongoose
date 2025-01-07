const axios = require("axios")
const config = require("../config")


const api = axios.create({
    baseURL: config.countryURL
})

const list = async () => {
    try {
        let result = await api.get("/countries")
        return result.data
    } catch (error) {
        throw new Error(error);
    }
}

const countryService = { list }

module.exports = countryService