const express = require('express')
const config = require("./src/config")
require("./src/config/database")
const cors = require("cors")
const router = require('./src/routers')
const errorMiddleware = require('./src/middlewares/error.middleware')
const { engine } = require("express-handlebars")
const path = require("path")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api", router)

app.engine(".hbs", engine({
    extname: ".hbs"
}))

app.set("view engine", ".hbs")

const viewPath = path.join(__dirname, './src/views')
app.set("views", viewPath)

app.get("/", (req, res) => {
    res.render("home", { name: req.query.name })
})

app.use(errorMiddleware)

app.listen(config.port, () => console.log(`Application app listening on port http://localhost:${config.port}`))