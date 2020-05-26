const moderatorRouter = require('express').Router()
const bcrypt = require('bcrypt')

const User = require('../models/user')
const Role = require("../models/role")

const authorizationFunctions = require("../helper/authorization")
const logger = require("../utils/logger")

const sendEmailWithPassword = require("../helper/mailer")
const generatePassword = require("../helper/password")

moderatorRouter.get("/users", async (req, res, next) => {
    const body = req.body

    //checks if the user has the userModerator role 
    userModeratorAuth = await authorizationFunctions.roleAuthorization(req, "5ec4127ec5890808ec774eef")

    if (userModeratorAuth.passed) {
        logger.info("karma")
        users = await User.find({})
        res.json(users)
    } else {
        res.status(401).json({ error: userModeratorAuth.message })
    }
})

moderatorRouter.post("/addUser", async (req, res, next) => {
    const body = req.body

    //checks if the user has the userModerator role 
    userModeratorAuth = await authorizationFunctions.roleAuthorization(req, "5ec4127ec5890808ec774eef")

    if (userModeratorAuth.passed) {
        const saltRounds = 10
        const password = generatePassword(10)
        
        logger.error(password)

        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            frontName: body.frontName,
            lastName: body.lastName,
            email: body.email,
            passwordHash: passwordHash
        })

        try {
            const savedUser = await user.save()
            sendEmailWithPassword(body.email, password, body.frontName, body.lastName)
            res.json(savedUser)
        } catch (error) {
            next(error)
        }
    } else {
        res.status(401).json({ error: userModeratorAuth.message })
    }
})


moderatorRouter.post("/deleteUser", async (req, res, next) => {
    const body = req.body

    //checks if the user has the userModerator role 
    userModeratorAuth = await authorizationFunctions.roleAuthorization(req, "5ec4127ec5890808ec774eef")

    if (userModeratorAuth.passed) {

        const user = await User.findById(body.userId)

        //delete the reference of the users in the roles
        user.roles.forEach(async (roleId) => {

            const role = await Role.findById(roleId)
            role.users = role.users.filter(userid => userid != body.userId)

            await role.save()
        })


        const deletedUser = await User.findByIdAndDelete(body.userId)
        res.json(deletedUser)
    } else {
        res.status(401).json({ error: userModeratorAuth.message })
    }
})


moderatorRouter.post("/addRole", async (req, res, next) => {
    const body = req.body

    //checks if the user has the userModerator role 
    userModeratorAuth = await authorizationFunctions.roleAuthorization(req, "5ec4127ec5890808ec774eef")

    if (userModeratorAuth.passed) {


        const role = new Role({
            abreviation: body.abreviation,
            description: body.description
        })

        try {
            const savedRole = await role.save()
            res.json(savedRole)
        } catch (error) {
            next(error)
        }
    } else {
        res.status(401).json({ error: userModeratorAuth.message })
    }
})

moderatorRouter.post("/toggleRole", async (req, res, next) => {
    const body = req.body

    //checks if the user has the addRole role 
    roleAuthorizationReturn = await authorizationFunctions.roleAuthorization(req, "5eb14429cad99108d41050a7")

    logger.info(roleAuthorizationReturn)

    if (roleAuthorizationReturn.passed) {
        role = await Role.findById(body.roleId)

        if(!role) {
            res.status(400).json({error: "The role does not exists"})
        }


        if(role.users.includes(body.userId)) {
            logger.info("remove")

            res.json(await removeRoleFromUser(body.userId, body.roleId))
        } else {
            logger.info("add")
            res.json(await addRoleToUser(body.userId, body.roleId))
        }

    } else {
        res.status(401).json({ error: roleAuthorizationReturn.message })
    }

})


const addRoleToUser = async (userId, roleId) => {
    //uses this to prevent duplucation since there are two responses 
    const responseValue = (user, role) => {
        return {
            user: user.toJSON(),
            role: role.toJSON()
        }
    }

    const user = await User.findById(userId)
    const role = await Role.findById(roleId)

    if (!user) {
        throw(400)
    } else if (!role) {
        throw(400)
    }
    //check if the user has the role assigned
    if (user.roles.includes(role._id)) {
        //just returns the operation as a succes since technically the role was added
        return (responseValue(user, role))
    }
    else {
        user.roles = user.roles.concat(role._id)
        savedUser = await user.save()
        role.users = role.users.concat(savedUser._id)
        savedRole = await role.save()
        return responseValue(savedUser, savedRole)
    }
}

const removeRoleFromUser = async (userId, roleId) => {
    //uses this to prevent duplucation since there are two responses 
    const responseValue = (user, role) => {
        return {
            user: user.toJSON(),
            role: role.toJSON()
        }
    }

    const user = await User.findById(userId)
    const role = await Role.findById(roleId)

    if (!user) {
        throw(400)
    } else if (!role) {
        throw(400)
    }

    else {
        //filter the role from the role list in the user enity
        user.roles = user.roles.filter(role => role._id != roleId)
        savedUser = await user.save()
        // filter the user from the user list in the role entity
        role.users = role.users.filter(user => user._id != userId)
        savedRole = await role.save()
        return responseValue(savedUser, savedRole)
    }
}

module.exports = moderatorRouter