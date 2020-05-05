const timeslotRouter = require("express").Router()
const Timeslot = require("../models/timeslot")

timeslotRouter.get("/", (req, res) => {
    Timeslot.find({}).then(response => {
        res.json(response.map(timeslot => timeslot.toJSON()))
    }).catch(error =>{
        res.status(400)
    })
})

timeslotRouter.get("/:id", (req, res) => {
    Timeslot.findById(req.params.id).then(response => {
        res.json(response.toJSON())
    })
})

timeslotRouter.post("/", (req, res) => {
    const body = req.body 

    if (body.jobLength === undefined || body.jobLength <= 0) {
        return res.status(400).json({error: "no job length specified"})
    }

    const timeslot = new Timeslot({
        startTime: new Date(),
        length : body.jobLength,
        user : body.user,
        TC: body.TC
    })

    timeslot.save().then(timesloteResponse => {
        res.json(timesloteResponse.toJSON())
    }).catch(error => {
        res.status(400).json({error: error})
    })
})

timeslotRouter.delete("/:id", (req, res) =>{
    Timeslot.findByIdAndRemove(req.params.id).then(response => {
        res.status(200).end()
    }).catch(error => {
        res.status(400).json({error: error})
    })
})

timeslotRouter.put("/:id", (req, res, next) => {
    const body = req.body

    const updatedTimeslot = {
        length: body.jobLength,
        user: body.user,
        TC: body.TC
    }

    Timeslot.findByIdAndUpdate(req.params.id, body, {new: true})
    .then(serverResponse => {
        res.json(serverResponse.toJSON())
    }).catch(error => next(error))
})

module.exports = timeslotRouter