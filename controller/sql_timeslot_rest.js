const timeslotRouter = require("express").Router()

const {User, Timeslot, TimeslotCategory, Role} = require("../models/models")
const logger = require("../utils/logger")
const {roleAuthorization, authorization} = require("../helper/sql_authorization")
const config = require("../utils/config")

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
        const timeslot = Timeslot.build({
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

                let returnTimeslot = await Timeslot.findByPk(timeslot.id, {
                    include: [{
                        model: Role
                    }, {
                        model: User,
                        association: "subscribers"
                    }]
                })

                res.json({timeslot: returnTimeslot})
            // }catch(error) {
            //     res.status(400).json({ errorCode: "SAVE_ERROR", error: error })
            // }
        }
    } else {
        res.status(401).json({ errorCode: "NOT_AUTHORIZED" })
    }
})

timeslotRouter.delete("/:timeslotId", async (req, res) => {

    //checks for createTimeslots
    const authPassed = await roleAuthorization(req, config.CREATE_TIMESLOT)
    if (authPassed.passed) {
        
        Timeslot.destroy({where: {id: req.params.timeslotId}}).then(response => {
            res.status(200).end()
        }).catch(error => {
            res.status(400).json({ errorCode: "DELETE_ERROR", error: error })
        })
    } else {
        res.status(401).json({ errorCode: "NOT_AUTHORIZED" })
    }
})

timeslotRouter.get("/:timeslotId", async(req, res) => {
    const authPassed = await authorization(req)
    if(authPassed.passed) {
        userRoles = (await authPassed.user.getRoles()).map(role => role.id)
        let timeslot = await Timeslot.findByPk(req.params.timeslotId, {
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
        if(timeslot){
            res.json({timeslot: timeslot})
        } else {
            res.status(404).end();
        }
    } else {
        res.status(401).json({ errorCode: "NOT_AUTHORIZED" })
    }
})

module.exports = timeslotRouter