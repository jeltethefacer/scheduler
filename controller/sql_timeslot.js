const timeslotRouter = require("express").Router()
const {User, Timeslot, TimeslotCategory, Role} = require("../models/models")


const config = require("../utils/config")
const { Op } = require("sequelize")

const authorization = require("../helper/sql_authorization").authorization

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
        const timeslot = await Timeslot.findByPk(body.timeslotId, {include: [{
            model: Role,
        }, {
            model: User,
            association: "subscribers"
        }]})
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
            res.json({timeslot: await timeslot.reload()});
        }
    } else {
        res.status(401).json({ errorCode: "NOT_AUTHORIZED" })
    }
})


timeslotRouter.post("/unsubscribe", async (req, res) => {
    const body = req.body

    const authPassed = await authorization(req)

    if (authPassed.passed) {
        let timeslot = await Timeslot.findByPk(body.timeslotId, {include: [{
            model: Role,
        }, {
            model: User,
            association: "subscribers"
        }]})
        
        if (await timeslot.hasSubscribers(authPassed.user)) {
            // checks if its between the timelimit

            timeslotCategory = await timeslot.getTimeslotCategory()
            startTimeDate = new Date(timeslot.startTime)
            currentDate = new Date()

            if (timeslotCategory && new Date(currentDate.getTime() + timeslotCategory.cancelLength * 60 * 60 * 1000) >= startTimeDate) {
                res.status(400).json({ errorCode: "TIME_ERROR_UNSUBSCRIBE", errorInfo: timeslotCategory.cancelLength })
            } else {
                await timeslot.removeSubscribers(authPassed.user);
                res.json({timeslot: await timeslot.reload()});
            }
        }
        else {
            res.json({timeslot: timeslot})
        }
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