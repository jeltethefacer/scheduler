const moderatorRouter = require('express').Router()
const bcrypt = require('bcrypt')

const {User, Role} = require('../models/models')

const authorizationFunctions = require("../helper/sql_authorization")
const logger = require("../utils/logger")

const config = require("../utils/config")

const sendEmailWithPassword = require("../helper/mailer")
const generatePassword = require("../helper/password")

moderatorRouter.get("/users", async (req, res, next) => {
    const body = req.body

    //checks if the user has the userModerator role 
    userModeratorAuth = await authorizationFunctions.roleAuthorization(req, config.USER_MODERATOR)

    if (userModeratorAuth.passed) {
        users = await User.findAll({
            include: ["roles", "chairman"]
        });
        res.json(users)
    } else {
        res.status(401).json({ error: userModeratorAuth.message })
    }
})

moderatorRouter.post("/addUser", async (req, res, next) => {
    const body = req.body

    //checks if the user has the userModerator role 
    userModeratorAuth = await authorizationFunctions.roleAuthorization(req, config.USER_MODERATOR)

    if (userModeratorAuth.passed) {
        const saltRounds = 10
        const password = generatePassword(10)

        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = User.build({
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
    userModeratorAuth = await authorizationFunctions.roleAuthorization(req, config.USER_MODERATOR)

    if (userModeratorAuth.passed) {

        const user = await User.destroy({where: {id: body.userId}})

        // //delete the reference of the users in the roles
        // user.roles.forEach(async (roleId) => {

        //     const role = await Role.findById(roleId)
        //     role.users = role.users.filter(userid => userid != body.userId)

        //     await role.save()
        // })


        //const deletedUser = await User.findByIdAndDelete(body.userId)
        res.json(user)
    } else {
        res.status(401).json({ error: userModeratorAuth.message })
    }
})


moderatorRouter.post("/addRole", async (req, res, next) => {
    const body = req.body

    //checks if the user has the userModerator role 
    userModeratorAuth = await authorizationFunctions.roleAuthorization(req, config.USER_MODERATOR)

    if (userModeratorAuth.passed) {


        const role = Role.build({
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
    const roleAuthorizationReturn = await authorizationFunctions.roleAuthorization(req, config.USER_MODERATOR)

    if (roleAuthorizationReturn.passed) {
        let role = await Role.findByPk(body.roleId)
        let user = await User.findByPk(body.userId)

        if (!role || !user) {
            res.status(400).json({ error: "The role or user does not exists" })
        }


        if (await role.hasUser(user)) {
            logger.info("remove")
            await role.removeUser(user);
            userRoles = await user.getRoles();
            res.json({user: user, role: userRoles})
        } else {
            logger.info("add")
            await role.addUser(user)
            userRoles = await user.getRoles();
            res.json({user: user, role: userRoles})
        }

    } else {
        res.status(401).json({ error: roleAuthorizationReturn.message })
    }

})

moderatorRouter.post("/toggleChairman", async (req, res, next) => {
    const body = req.body

    //checks if the user has the addRole role 
    roleAuthorizationReturn = await authorizationFunctions.roleAuthorization(req, config.USER_MODERATOR)

    if (roleAuthorizationReturn.passed) {
        let user = await User.findByPk(body.userId, {
            include: ["roles", "chairman"]
        })
        let role = await Role.findByPk(body.roleId)

        if (!user) {
            res.status(400).json({ errorCode: "NO_USER_ERROR" })
        }
        else if(!role) {
            res.status(400).json({errorCode: "NO_ROLE_ERROR"})
        } else if(!(await user.hasChairman(role))) {
            logger.info("add")
            await user.addChairman(role);
        } else {
            logger.info("remove")
            await user.removeChairman(role);
        }
        //gets the updated userinformation.
        await user.reload();
        res.json({user: user, role: role})
    } else {
        res.status(401).json({ errorCode: "NO_AUTHORIZATION" })
    }
})

module.exports = moderatorRouter    