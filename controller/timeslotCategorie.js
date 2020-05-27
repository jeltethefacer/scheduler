const timeslotCategorieRouter = require("express").Router()
const TimeslotCategorie = require("../models/timeslotCategorie")
const User = require("../models/user")
const authorization = require("../helper/authorization").authorization
const roleAuthorization = require("../helper/authorization").roleAuthorization


timeslotCategorieRouter.post("/", async (req, res) => {
    const body = req.body 

    const authPassed = await roleAuthorization(req, "5ecd19715a69b00fc49bc4fc")

    if(authPassed.passed){

        const userId = authPassed.user._id.toString()

        const timeslotCategorie = new TimeslotCategorie({
            title: body.title,
            cancelLength: body.cancelLength
        })

        timeslotCategorie.save().then(timesloteCategorieResponse => {
            res.json(timesloteCategorieResponse.toJSON())
        }).catch(error => {
            res.status(400).json({errorCode: "SAVE_ERROR", error: error})
        })
    } else{
        res.status(401).json({errorCode: "NOT_AUTHORIZED"})
    }
})

timeslotCategorieRouter.get("/", (req, res) => {
    TimeslotCategorie.find({}).then(response => {
        res.json(response.map(timeslotCategorie => timeslotCategorie.toJSON()))
    }).catch(error =>{
        res.status(400).json({errorCode: "LOAD_TIMESLOT_CATEGORIE_ERROR", error: error})
    })
})


module.exports = timeslotCategorieRouter