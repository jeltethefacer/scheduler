const express = require("express")
const mongoose = require("mongoose")
const logger = require("./utils/logger")
const config = require("./utils/config")
const middleware = require('./utils/middleware')

const timeslotRouter = require("./controller/timeslot")
const usersRouter = require('./controller/user')
const roleRouter = require("./controller/role")
logger.info("connecting to ", config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logger.info("connected to the db")
    }).catch(error => {
        logger.error(`an error has occured when connecting to the db: ${error}`)
    })

const app = express()

app.use(express.json())
app.use(middleware.requestLogger)
app.get("/", (req, res) => {
    res.json({
        jelte: "gay"
    })
})

app.use("/api/timeslot", timeslotRouter)
app.use("/api/user", usersRouter)
app.use("/api/role", roleRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.listen(config.PORT, () => {
    logger.info(`the back_end server is running on port ${config.PORT}`)
})
