const express = require("express")
const cors = require('cors')
const path = require('path');


const logger = require("./utils/logger")
const config = require("./utils/config")
const middleware = require('./utils/middleware')

const timeslotRouter = require("./controller/sql_timeslot")
const timeslotRouter2 = require("./controller/sql_timeslot_rest")
const usersRouter = require('./controller/sql_user')
const roleRouter = require("./controller/sql_role")
const loginRouter = require("./controller/sql_login")
const moderatorRouter = require("./controller/sql_moderator")
const timeslotCategorieRouter = require("./controller/sql_timeslotCategory")

const app = express()

app.use(cors())

app.use(express.json())
app.use(middleware.requestLogger)

app.use(express.static('build'))


app.use("/api/timeslot", timeslotRouter)
app.use("/api/timeslot", timeslotRouter2)

app.use("/api/user", usersRouter)
app.use("/api/user/login", loginRouter)
app.use("/api/role", roleRouter)
app.use("/api/moderator", moderatorRouter)
app.use("/api/timeslotcategory", timeslotCategorieRouter)

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(middleware.errorHandler)

app.listen(config.PORT, () => {
    logger.info(`the back_end server is running on port ${config.PORT}`)
})
