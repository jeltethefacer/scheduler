const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()

const config = require("../utils/config")

const authorizationFunctions = require("../helper/sql_authorization")

const {User} = require('../models/models')
const logger = require('../utils/logger')

loginRouter.post('/', async (request, response) => {
    const body = request.body

    const user = await User.findOne({where: { email: body.email }})

    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
        errorCode: 'INVALID_EMAIL_OR_PASS'
        })
    }

    const userForToken = {
        email: user.email,
        id: user.id,
    }

    const token = jwt.sign(userForToken, config.SECRET)

    response
        .status(200)
        .send({ token, email: user.email, frontName: user.frontName })
})


loginRouter.post("/verify", async(req, res) => {
        
    const user = await authorizationFunctions.authorization(req)
    if(user.passed){
        res.status(200).send()
    }  
    res.status(401).send()
})

module.exports = loginRouter