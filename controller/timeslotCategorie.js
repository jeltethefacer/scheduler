const timeslotCategorieRouter = require("express").Router()
const TimeslotCategorie = require("../models/timeslotCategorie")
const User = require("../models/user")
const authorization = require("../helper/authorization").authorization
const roleAuthorization = require("../helper/authorization").roleAuthorization

const config = require("../utils/config")

timeslotCategorieRouter.post("/", async (req, res, next) => {
    const body = req.body 

    const authPassed = await roleAuthorization(req, config.CREATE_TIMESLOT)

    if(authPassed.passed){

        const userId = authPassed.user._id.toString()

        subscribeLength = body.subscribeLength
        cancelLength = body.cancelLength
        if(subscribeLength<0 || (subscribeLength < cancelLength && !(subscribeLength == 0))) {
            res.status(400).json({errorCode: "TIME_ERROR"})
        } else {
            const timeslotCategorie = new TimeslotCategorie({
                title: body.title,
                cancelLength: body.cancelLength,
                subscribeLength: body.subscribeLength
            })
    
            timeslotCategorie.save().then(timesloteCategorieResponse => {
                res.json(timesloteCategorieResponse.toJSON())
            }).catch(error => {
                res.status(400).json({errorCode: "SAVE_ERROR", error: error})
            })
        }
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

timeslotCategorieRouter.get("/:id", async (req, res) => {
    TimeslotCategorie.findById(req.params.id).then((response) => {
        res.json({timeslotCategorie: response})
    }).catch((error) => {
        res.status(400).json({errorCode: "NO_TIMESLOTCATEGORIE_ERROR"})
    })
})

timeslotCategorieRouter.post("/change", async (req, res, next) => {
    const body = req.body 

    const authPassed = await roleAuthorization(req, config.CREATE_TIMESLOT)

    if(authPassed.passed){

        const userId = authPassed.user._id.toString()
        const subscribeLength = body.subscribeLength
        const cancelLength = body.cancelLength

        if(subscribeLength<0 || (subscribeLength < cancelLength && !(subscribeLength == 0))) {
            res.status(400).json({errorCode: "TIME_ERROR"})
        } else {
            let timeslotCategorie = await TimeslotCategorie.findById(body.timeslotCategorieId)
            timeslotCategorie.title = body.title
            timeslotCategorie.subscribeLength = subscribeLength
            timeslotCategorie.cancelLength = cancelLength
            
            timeslotCategorie.save().then(timesloteCategorieResponse => {
                res.json({timeslotCategorie: timesloteCategorieResponse.toJSON()})
            }).catch(error => {
                res.status(400).json({errorCode: "SAVE_ERROR", error: error})
            })
        }
    } else{
        res.status(401).json({errorCode: "NOT_AUTHORIZED"})
    }
})


module.exports = timeslotCategorieRouter