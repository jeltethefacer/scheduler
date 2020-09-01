const timeslotCategoryRouter = require("express").Router()
const {User, TimeslotCategory} = require("../models/models")

const authorization = require("../helper/sql_authorization").authorization
const roleAuthorization = require("../helper/sql_authorization").roleAuthorization

const config = require("../utils/config")

timeslotCategoryRouter.post("/", async (req, res, next) => {
    const body = req.body 

    const authPassed = await roleAuthorization(req, config.CREATE_TIMESLOT)

    if(authPassed.passed){

        subscribeLength = body.subscribeLength
        cancelLength = body.cancelLength
        if(subscribeLength<0 || (subscribeLength < cancelLength && !(subscribeLength == 0))) {
            res.status(400).json({errorCode: "TIME_ERROR"})
        } else {
            const timeslotCategory = TimeslotCategory.build({
                title: body.title,
                cancelLength: body.cancelLength,
                subscribeLength: body.subscribeLength
            })
    
            timeslotCategory.save().then(timesloteCategoryResponse => {
                res.json(timesloteCategoryResponse.toJSON())
            }).catch(error => {
                res.status(400).json({errorCode: "SAVE_ERROR", error: error})
            })
        }
    } else{
        res.status(401).json({errorCode: "NOT_AUTHORIZED"})
    }
})

timeslotCategoryRouter.get("/", (req, res) => {
    TimeslotCategory.findAll().then(response => {
        res.json(response)
    }).catch(error =>{
        res.status(400).json({errorCode: "LOAD_TIMESLOT_CATEGORY_ERROR", error: error})
    })
})

timeslotCategoryRouter.get("/:id", async (req, res) => {
    timeslotCategory.findByPk(req.params.id).then((response) => {
        res.json({timeslotCategory: response})
    }).catch((error) => {
        res.status(400).json({errorCode: "NO_TIMESLOTCATEGORY_ERROR"})
    })
})

timeslotCategoryRouter.post("/change", async (req, res, next) => {
    const body = req.body 

    const authPassed = await roleAuthorization(req, config.CREATE_TIMESLOT)

    if(authPassed.passed){

        const userId = authPassed.user.id
        const subscribeLength = body.subscribeLength
        const cancelLength = body.cancelLength
        const title = body.title

        if(subscribeLength<0 || (subscribeLength < cancelLength && !(subscribeLength == 0))) {
            res.status(400).json({errorCode: "TIME_ERROR"})
        } else if(title.length < 3){
            res.status(400).json({errorCode: "TITLE_LENGTH_ERROR"})
        } else {
            let timeslotCategory = await timeslotCategory.findByPk(body.timeslotCategoryId)
            timeslotCategory.title = title
            timeslotCategory.subscribeLength = subscribeLength
            timeslotCategory.cancelLength = cancelLength
            
            timeslotCategory.save().then(timesloteCategorieResponse => {
                res.json({timeslotCategory: timesloteCategorieResponse.toJSON()})
            }).catch(error => {
                res.status(400).json({errorCode: "SAVE_ERROR", error: error})
            })
        }
    } else{
        res.status(401).json({errorCode: "NOT_AUTHORIZED"})
    }
})


module.exports = timeslotCategoryRouter