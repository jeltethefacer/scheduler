const moderatorRouter = require('express').Router()
const bcrypt = require('bcrypt')



const {User, Role, sequelize} = require('../models/models')
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
        try {
            users = await User.findAll({
                include: ["roles", "chairman"]
            });
            res.json(users)
        }catch(error){
            logger.error(error)
            res.status(500).json({errorCode: "LOAD_ERROR"})
        }
    } else {
        res.status(401).json({ error: userModeratorAuth.message })
    }
})

moderatorRouter.post("/user", async (req, res, next) => {
    const body = req.body

    //checks if the user has the userModerator role 
    userModeratorAuth = await authorizationFunctions.roleAuthorization(req, config.USER_MODERATOR)

    if (userModeratorAuth.passed) {


        try {
            const saltRounds = 10
            const password = generatePassword(10)
    
            const passwordHash = await bcrypt.hash(password, saltRounds)
    
            const user = User.build({
                frontName: body.frontName,
                lastName: body.lastName,
                email: body.email,
                passwordHash: passwordHash
            })


            const savedUser = await user.save()
            sendEmailWithPassword(body.email, password, body.frontName, body.lastName)
            res.json(savedUser)
        } catch (error) {
            logger.error(error)
            res.status(500).json({errorCode: "CREATE_ERROR"})
        }
    } else {
        res.status(401).json({ error: userModeratorAuth.message })
    }
})


moderatorRouter.delete("/user/:userId", async (req, res, next) => {
    //checks if the user has the userModerator role 
    userModeratorAuth = await authorizationFunctions.roleAuthorization(req, config.USER_MODERATOR)

    if (userModeratorAuth.passed) {
        try {
            const user = await User.destroy({where: {id: req.params.userId}})
            res.json(user)
        }catch (error){
            logger.error(error)
            res.status(500).json({errorCode: "DELETE_ERROR"})
        }

    } else {
        res.status(401).json({ error: userModeratorAuth.message })
    }
})


moderatorRouter.post("/role", async (req, res, next) => {
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
            res.status(500).json({errorCode: "SAVE_ERROR"})
        }
    } else {
        res.status(401).json({ error: userModeratorAuth.message })
    }
})

moderatorRouter.put("/user/:userId/role/:roleId", async (req, res, next) => {
    //checks if the user has the addRole role 
    const roleAuthorizationReturn = await authorizationFunctions.roleAuthorization(req, config.USER_MODERATOR)

    if (roleAuthorizationReturn.passed) {

        const transaction = await sequelize.transaction();

        try {
            let role = await Role.findByPk(req.params.roleId)
            let user = await User.findByPk(req.params.userId, {
                include: ["roles", "chairman"]
            })
    
            if (!role || !user) {
                res.status(400).json({ error: "The role or user does not exists" })
            }
    
    
            if (await role.hasUser(user)) {
                logger.info("remove")
                await role.removeUser(user, {transaction: transaction});
            } else {
                logger.info("add")
                await role.addUser(user, {transaction: transaction})
            }

            await transaction.commit()
            await user.reload();
            
            res.json({user: user})
        }catch (error){
            logger.error("an error has occured in toggleChairman", error)

            await transaction.rollback()
            res.status(500).json({ errorCode: "SAVE_ERROR" })
        }
        

    } else {
        res.status(401).json({ error: roleAuthorizationReturn.message })
    }

})

moderatorRouter.put("/user/:userId/chairman/:roleId", async (req, res, next) => {
    //checks if the user has the addRole role 
    roleAuthorizationReturn = await authorizationFunctions.roleAuthorization(req, config.USER_MODERATOR)

    if (roleAuthorizationReturn.passed) {

        const transaction = await sequelize.transaction();

        try {
            let user = await User.findByPk(req.params.userId, {
                include: ["roles", "chairman"]
            })
            let role = await Role.findByPk(req.params.roleId)
    
            if (!user) {
                res.status(400).json({ errorCode: "NO_USER_ERROR" })
            }
            else if(!role) {
                res.status(400).json({errorCode: "NO_ROLE_ERROR"})
            } else if(!(await user.hasChairman(role))) {
                await user.addChairman(role, {transaction: transaction});
            } else {
                await user.removeChairman(role, {transaction: transaction});
            }

            await transaction.commit();
            //gets the updated userinformation.
            await user.reload();
            res.json({user: user})

        }catch (error) {
            logger.error("an error has occured in toggleChairman", error)
            
            await transaction.rollback()
            res.status(500).json({ errorCode: "SAVE_ERROR" })
        }
        
    } else {
        res.status(401).json({ errorCode: "NO_AUTHORIZATION" })
    }
})

module.exports = moderatorRouter    