const fs = require("fs/promises")
const handlebars = require("handlebars")
const path = require("path")

const renderTemplate = async (name, params) => {
    const filePath = path.join(__dirname, "../views/templates", `${name}.hbs`)
    const buffer = await fs.readFile(filePath)
    const content = buffer.toString("utf-8")

    const template = handlebars.compile(content)

    return template(params)
}

module.exports = renderTemplate