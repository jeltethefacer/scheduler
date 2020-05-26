const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const Role = require("../models/role")

const authorizationFunctions = require("../helper/authorization")
const logger = require("../utils/logger")



usersRouter.post("/", async (req, res, next) => {
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
    } catch (error) {
        next(error)
    }
})

usersRouter.get("/", async (req, res, next) => {
    const body = req.body
    const user = await authorizationFunctions.authorization(req)
    //maybe innificient but meh

    const returnUser = await User.findById(user.user._id).populate("roles", {
        abreviation: 1, description: 1
    })

    if (user.passed) {
        res.json(returnUser.toJSON())
    }
    else {
        res.status(401).json({ error: user.message })
    }
})

usersRouter.post("/addRole", async (req, res, next) => {
    const body = req.body

    //checks if the user has the addRole role 
    roleAuthorizationReturn = await authorizationFunctions.roleAuthorization(req, "5eb14429cad99108d41050a7")

    logger.info(roleAuthorizationReturn)

    if (roleAuthorizationReturn.passed) {
        logger.info("karma")
        //uses this to prevent duplucation since there are two responses 
        const responseValue = (user, role) => {
            return {
                user: user.toJSON(),
                role: role.toJSON()
            }
        }

        const user = await User.findById(body.userId)
        const role = await Role.findById(body.roleId)

        if (!user) {
            res.status(400).json({ error: "user not found" })
        } else if (!role) {
            res.status(400).json({ error: "role not found" })
        }
        //check if the user has the role assigned
        if (user.roles.includes(role._id)) {
            //just returns the operation as a succes since technically the role was added
            res.json(responseValue(user, role))
        }
        else {
            user.roles = user.roles.concat(role._id)
            savedUser = await user.save()
            role.users = role.users.concat(savedUser._id)
            savedRole = await role.save()
            res.json(responseValue(savedUser, savedRole))
        }
    } else {
        res.status(401).json({ error: roleAuthorizationReturn.message })
    }

})

module.exports = usersRouter