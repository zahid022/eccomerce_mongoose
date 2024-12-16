const express = require('express')
const config = require("./src/config")
require("./src/config/database")
const cors = require("cors")
const router = require('./src/routers')
const errorMiddleware = require('./src/middlewares/error.middleware')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.json({message : 'Application is running!'}))

app.use("/api", router)

app.use(errorMiddleware)

app.listen(config.port, () => console.log(`Application app listening on port http://localhost:${config.port}`))