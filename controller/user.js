const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

const logger = require("../utils/logger")

usersRouter.post("/", async (req, res, next) =>{
    const body = req.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        frontName: body.frontName,
        lastName: body.lastName,
        email: body.email,
        passwordHash: passwordHash
    })
    try {
        const savedUser = await user.save()
        res.json(savedUser)
    } catch (error){
        next(error)
    }
})  

usersRouter.get("/", async (req, res, next) => {
    const users = await User.find({})
    logger.info(User.collection.collectionName)
    res.json(users.map(user => user.toJSON()))
})

module.exports = usersRouter