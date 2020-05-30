const timeslotRouter = require("express").Router()
const Timeslot = require("../models/timeslot")
const User = require("../models/user")
const TimeslotCategorie = require("../models/timeslotCategorie")

const config = require("../utils/config")

const authorization = require("../helper/authorization").authorization
const roleAuthorization = require("../helper/authorization").roleAuthorization

timeslotRouter.get("/", async (req, res) => {
    const body = req.body

    const authPassed = await authorization(req)

    if (authPassed.passed) {
        //if it's the combar show everything 
        if(authPassed.user.roles.includes(config.COM_BAR)) {
            const timeslots = await Timeslot.find({startTime: {$gt: new Date()}})
            res.json(timeslots)
        } else {
            Timeslot.find({startTime: {$gt: new Date()}, roles: {$in: authPassed.user.roles}}).then(async response => {

                const categories = await TimeslotCategorie.find({})
                const mappedCategories = {}
                categories.forEach((categorie) => {
                    mappedCategories[categorie._id.toString()] = categorie
                })
                const filtered = response.filter((timeslot) => {
                    const timestartTimeDate = new Date(timeslot.startTime)
                    const currentDate = new Date()
                    return (new Date(timestartTimeDate - mappedCategories[timeslot.timeslotCategorie].subscribeLength * 60 * 60 * 1000) < currentDate || mappedCategories[timeslot.timeslotCategorie].subscribeLength === 0)

                })
                res.json(filtered.map(timeslot => timeslot.toJSON()))
            }).catch(error => {
                res.status(400)
            })
        }
    } else {
        res.status(401).json({ error: "no auth user" })
    }
})

timeslotRouter.post("/subscribe", async (req, res) => {
    const body = req.body

    const authPassed = await authorization(req)

    if (authPassed.passed) {
        const timeslot = await Timeslot.findById(body.timeslotId)
        const user = await User.findById(authPassed.user._id)
        const userId = authPassed.user._id.toString()

        timeslotCategorie = await TimeslotCategorie.findById(timeslot.timeslotCategorie)
        startTimeDate = new Date(timeslot.startTime)
        currentDate = new Date()

        if (timeslotCategorie && new Date(startTimeDate - timeslotCategorie.subscribeLength * 60 * 60 * 1000) > currentDate || timeslotCategorie.subscribeLength === 0) {
            res.status(400).json({ errorCode: "TIME_ERROR_SUBSCRIBE", errorInfo: timeslotCategorie.cancelLength })
        } else if (timeslot.subscribed.includes(userId)) {
            res.json(timeslot.toJSON())
        } else if (timeslot.subscribed.length >= timeslot.maxPeople) {
            res.status(400).json({ errorCode: "TIMESLOT_FULL" })
        } else if (timeslot.roles.filter(role => user.roles.includes(role)).length === 0) {
            //intersects the roles from the timeslot with the roles in user if there is overlap allow to subscribe
            res.status(400).json({ errorCode: "NO_VALID_ROLE" })
        } else {
            timeslot.subscribed = timeslot.subscribed.concat(userId)

            timeslot.save().then(timesloteResponse => {
                res.json(timesloteResponse.toJSON())
            }).catch(error => {
                res.status(400).json({ error: error })
            })
        }
    } else {
        res.status(401).json({ error: "no auth user" })
    }
})


timeslotRouter.post("/unsubscribe", async (req, res) => {
    const body = req.body

    const authPassed = await authorization(req)

    if (authPassed.passed) {
        timeslot = await Timeslot.findById(body.timeslotId)
        const userId = authPassed.user._id.toString()



        if (timeslot.subscribed.includes(userId)) {
            // checks if its between the timelimit

            timeslotCategorie = await TimeslotCategorie.findById(timeslot.timeslotCategorie)

            startTimeDate = new Date(timeslot.startTime)

            currentDate = new Date()

            if (timeslotCategorie && new Date(currentDate.getTime() + timeslotCategorie.cancelLength * 60 * 60 * 1000) >= startTimeDate) {
                res.status(400).json({ errorCode: "TIME_ERROR_UNSUBSCRIBE", errorInfo: timeslotCategorie.cancelLength })
            } else {
                timeslot.subscribed = timeslot.subscribed.filter(user => {
                    user !== userId
                })

                timeslot.save().then(timesloteResponse => {
                    res.json(timesloteResponse.toJSON())
                }).catch(error => {
                    res.status(400).json({ error: error })
                })
            }
        }
        else {
            res.json(timeslot.toJSON())
        }
    } else {
        res.status(401).json({ error: "no auth user" })
    }
})



timeslotRouter.post("/", async (req, res) => {
    const body = req.body

    //checks for createTimeslots
    const authPassed = await roleAuthorization(req, config.CREATE_TIMESLOT)
    console.log(authPassed)
    //checks if the chairman wants to create a timeslot for it's own users
    const chairmanRoles = authPassed.user.chairman
    const intersect = body.roles.filter(role => chairmanRoles.includes(role))

    if (authPassed.passed || body.roles.length === intersect.length) {

        const userId = authPassed.user._id.toString()
        const startTime = new Date(body.startTime)
        const endTime = new Date(body.endTime)

        const timeslot = new Timeslot({
            description: body.description,
            startTime: startTime,
            endTime: endTime,
            maxPeople: body.maxPeople,
            createdBy: userId,
            roles: body.roles,
            subscribed: [],
            timeslotCategorie: body.timeslotCategorie
        })
        if(body.roles.length === 0){
            res.status(400).json({errorCode: "NO_ROLES_ERROR"})
        } else if(startTime > endTime) {
            res.status(400).json({errorCode: "START_GREATER_END_TIME_ERROR"})
        } else {
            timeslot.save().then(timesloteResponse => {
                res.json(timesloteResponse.toJSON())
            }).catch(error => {
                res.status(400).json({ errorCode: "SAVE_ERROR", error: error })
            })
        }
    } else {
        res.status(401).json({ errorCode: "NOT_AUTHORIZED" })
    }
})

timeslotRouter.post("/delete", async (req, res) => {

    //checks for createTimeslots
    const authPassed = await roleAuthorization(req, config.CREATE_TIMESLOT)


    if (authPassed.passed) {
        Timeslot.findByIdAndRemove(req.body.timeslotId).then(response => {
            res.status(200).end()
        }).catch(error => {
            res.status(400).json({ errorCode: "SAVE_ERROR", error: error })
        })
    } else {
        res.status(401).json({ errorCode: "NOT_AUTHORIZED" })
    }
})

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

module.exports = timeslotRouter