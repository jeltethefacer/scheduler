const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const {User, Role} = require('../models/models')

const authorizationFunctions = require("../helper/sql_authorization")
const logger = require("../utils/logger")
const config = require("../utils/config")


//TODO: look if this function is necessary
usersRouter.post("/", async (req, res, next) => {
    const body = req.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = User.build({
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
    
    if (user.passed) {
        const returnUser = user.user
        const userRoles =  await returnUser.getRoles()
        res.json({user: returnUser, roles: userRoles})
    }
    else {
        res.status(401).json({ error: user.message })
    }
})

// this function is probably a duplicate

// usersRouter.post("/addRole", async (req, res, next) => {
//     const body = req.body

//     //checks if the user has the addRole role 
//     roleAuthorizationReturn = await authorizationFunctions.roleAuthorization(req, config.USER_MODERATOR)

//     if (roleAuthorizationReturn.passed) {
//         //uses this to prevent duplucation since there are two responses 
//         const responseValue = (user, role) => {
//             return {
//                 user: user,
//                 role: role
//             }
//         }

//         const user = await User.findByPk( body.userId);
//         const role = await Role.findByPk( body.roleId);

//         if (!user) {
//             res.status(400).json({ error: "user not found" })
//         } else if (!role) {
//             res.status(400).json({ error: "role not found" })
//         }

//         await user.addRole(role);
//         res.json(responseValue(user, role))
    
//     } else {
//         res.status(401).json({ error: roleAuthorizationReturn.message })
//     }
// })

module.exports = usersRouter