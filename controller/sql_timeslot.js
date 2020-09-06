const timeslotRouter = require("express").Router()
const {User, Timeslot, TimeslotCategory, Role} = require("../models/models")


const config = require("../utils/config")
const logger = require("../utils/logger")
const sequelize = require("../models/dbConnection")
const timeslot = require("../models/timeslot")
const { Op } = require("sequelize")

const authorization = require("../helper/sql_authorization").authorization
const roleAuthorization = require("../helper/sql_authorization").roleAuthorization

timeslotRouter.get("/", async (req, res) => {
    const body = req.body

    const authPassed = await authorization(req)

    if (authPassed.passed) {
        //if it's the combar show everything 
        if (await authPassed.user.hasRole(config.COM_BAR)) {
            const timeslots = await Timeslot.findAll({where: {
                startTime: {
                    [Op.gt]: new Date()
                }},
                include: [{
                    model: Role,
                }, {
                    model: User,
                    association: "subscribers"
                }]
            })
            res.json(timeslots)
        } else {
            userRoles = (await authPassed.user.getRoles()).map(role => role.id)
            let timeslots = await Timeslot.findAll({
                where: {
                    startTime: {
                        [Op.gt]: new Date()
                    }
                },
                include: [{
                    model: Role,
                    where: {
                        "id": userRoles
                    }
                }, {
                    model: User,
                    association: "subscribers"
                }]
            })

        
            const categories = await TimeslotCategory.findAll()
            const mappedCategories = {}
            categories.forEach((categorie) => {
                mappedCategories[categorie.id] = categorie
            })
            const filtered = timeslots.filter((timeslot) => {
                const timestartTimeDate = new Date(timeslot.startTime)
                const currentDate = new Date()
                return (new Date(timestartTimeDate - mappedCategories[timeslot.timeslotCategory].subscribeLength * 60 * 60 * 1000) < currentDate || mappedCategories[timeslot.timeslotCategory].subscribeLength === 0)

            })
            res.json(filtered)
        }
    } else {
        res.status(401).json({ errorCode: "NOT_AUTHORIZED" })
    }
})

timeslotRouter.get("/user", async (req, res) => {
    const body = req.body

    const authPassed = await authorization(req)
    if (authPassed.passed) {
        let timeslots = await authPassed.user.getSubscribers({where: {
            startTime: {
                [Op.gt]: new Date()
            }},
            include: [{
                model: Role
            }, {
                model: User,
                association: "subscribers"
            }]
        });
        res.json({timeslots})
    } else {
        res.status(401).json({ errorCode: "NOT_AUTHORIZED" })
    }
})

timeslotRouter.post("/subscribe", async (req, res) => {
    const body = req.body

    const authPassed = await authorization(req)

    if (authPassed.passed) {
        const timeslot = await Timeslot.findByPk(body.timeslotId)
        const user = authPassed.user

        timeslotCategory = await timeslot.getTimeslotCategory()

        startTimeDate = new Date(timeslot.startTime)
        currentDate = new Date()
        
        userRoles = (await user.getRoles()).map(role => role.id)
        timeslotRoles = (await timeslot.getRoles()).map(role => role.id)

        intersection = userRoles.filter(role => timeslotRoles.includes(role))
          

        if (timeslotCategory && (new Date(startTimeDate - timeslotCategory.subscribeLength * 60 * 60 * 1000) > currentDate && timeslotCategory.subscribeLength !== 0)) {
            res.status(400).json({ errorCode: "TIME_ERROR_SUBSCRIBE", errorInfo: timeslotCategory.subscribeLength })
        } else if (await timeslot.countSubscribers() >= timeslot.maxPeople) {
            res.status(400).json({ errorCode: "TIMESLOT_FULL" })
        } else if (intersection.length == 0) {
            //intersects the roles from the timeslot with the roles in user if there is overlap allow to subscribe
            res.status(400).json({ errorCode: "NO_VALID_ROLE" })
        } else {
            await timeslot.addSubscribers(user);
            res.json(await timeslot.getSubscribers());
        }
    } else {
        res.status(401).json({ errorCode: "NOT_AUTHORIZED" })
    }
})


timeslotRouter.post("/unsubscribe", async (req, res) => {
    const body = req.body

    const authPassed = await authorization(req)

    if (authPassed.passed) {
        let timeslot = await Timeslot.findByPk(body.timeslotId)
        
        if (await timeslot.hasSubscribers(authPassed.user)) {
            // checks if its between the timelimit

            timeslotCategory = await timeslot.getTimeslotCategory()
            startTimeDate = new Date(timeslot.startTime)
            currentDate = new Date()

            if (timeslotCategory && new Date(currentDate.getTime() + timeslotCategory.cancelLength * 60 * 60 * 1000) >= startTimeDate) {
                res.status(400).json({ errorCode: "TIME_ERROR_UNSUBSCRIBE", errorInfo: timeslotCategory.cancelLength })
            } else {
                await timeslot.removeSubscribers(authPassed.user);
                res.json(await timeslot.getSubscribers());
            }
        }
        else {
            res.json(timeslot.toJSON())
        }
    } else {
        res.status(401).json({ errorCode: "NOT_AUTHORIZED" })
    }
})



timeslotRouter.post("/", async (req, res) => {
    const body = req.body

    //checks for createTimeslots
    const authPassed = await roleAuthorization(req, config.CREATE_TIMESLOT)
    
    //checks if the chairman wants to create a timeslot for it's own users
    const chairmanRoles = await authPassed.user.getChairman();
    //const intersect = body.roles.filter(role => chairmanRoles.includes(role))

    if (authPassed.passed /*|| body.roles.length === intersect.length*/ ) {

        const user = authPassed.user

        const startTime = new Date(body.startTime)
        const endTime = new Date(body.endTime)
        const timeslot = await Timeslot.build({
            description: body.description,
            startTime: startTime,
            endTime: endTime,
            maxPeople: body.maxPeople,
        })

        logger.info("timeslot", body.roles.length)
        if (body.roles.length === 0) {
            res.status(400).json({ errorCode: "NO_ROLES_ERROR" })
        } else if (startTime > endTime) {
            res.status(400).json({ errorCode: "START_GREATER_END_TIME_ERROR" })
        } else {
            // try {
                await timeslot.save()
                logger.info("in saving")
                await timeslot.setCreatedByUser(user)
                await timeslot.setTimeslotCategory(body.timeslotCategory)
                await timeslot.setRoles(body.roles);
                await timeslot.reload()
                res.json(timeslot)
            // }catch(error) {
            //     res.status(400).json({ errorCode: "SAVE_ERROR", error: error })
            // }
        }
    } else {
        res.status(401).json({ errorCode: "NOT_AUTHORIZED" })
    }
})

timeslotRouter.delete("/:id", async (req, res) => {

    //checks for createTimeslots
    const authPassed = await roleAuthorization(req, config.CREATE_TIMESLOT)
    if (authPassed.passed) {
        
        Timeslot.destroy({where: {id: req.params.id}}).then(response => {
            res.status(200).end()
        }).catch(error => {
            res.status(400).json({ errorCode: "DELETE_ERROR", error: error })
        })
    } else {
        res.status(401).json({ errorCode: "NOT_AUTHORIZED" })
    }
})
//TODO: edit timeslots  low prior
/*
timeslotRouter.put("/:id", (req, res, next) => {
    const body = req.body

    const updatedTimeslot = {
        length: body.jobLength,
        user: body.user,
        TC: body.TC
    }

    Timeslot.findByIdAndUpdate(req.params.id, body, { new: true })
        .then(serverResponse => {
            res.json(serverResponse.toJSON())
        }).catch(error => next(error))
})
*/
module.exports = timeslotRouter