const timeslotRouter = require("express").Router()
const Timeslot = require("../models/timeslot")
const User = require("../models/user")
const TimeslotCategorie = require("../models/timeslotCategorie")

const authorization = require("../helper/authorization").authorization
const roleAuthorization = require("../helper/authorization").roleAuthorization

timeslotRouter.get("/", async (req, res) => {
    const body = req.body

    const authPassed = await authorization(req)

    if (authPassed.passed) {

        Timeslot.find({startTime: {$gt: new Date()}, roles: {$in: authPassed.user.roles}}).then(response => {
            res.json(response.map(timeslot => timeslot.toJSON()))
        }).catch(error => {
            res.status(400)
        })
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

        if (timeslot.subscribed.includes(userId)) {
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
                res.status(400).json({ errorCode: "TIME_ERROR", errorInfo: timeslotCategorie.cancelLength })
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

    const authPassed = await roleAuthorization(req, "5ecd19715a69b00fc49bc4fc")

    if (authPassed.passed) {

        const userId = authPassed.user._id.toString()
        let timeNow = new Date()


        let timeNow2 = new Date()
        timeNow2.setHours(18)
        timeNow2.setMinutes(0)
        timeNow2.setSeconds(0)


        const timeslot = new Timeslot({
            description: body.description,
            startTime: body.startTime,
            endTime: body.endTime,
            maxPeople: body.maxPeople,
            createdBy: userId,
            roles: body.roles,
            subscribed: [],
            timeslotCategorie: body.timeslotCategorie
        })

        timeslot.save().then(timesloteResponse => {
            res.json(timesloteResponse.toJSON())
        }).catch(error => {
            res.status(400).json({ errorCode: "SAVE_ERROR", error: error })
        })
    } else {
        res.status(401).json({ errorCode: "NOT_AUTHORIZED" })
    }
})

timeslotRouter.post("/delete", async (req, res) => {

    //checks for createTimeslots
    const authPassed = await roleAuthorization(req, "5ecd19715a69b00fc49bc4fc")
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