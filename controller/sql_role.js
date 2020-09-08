const roleRouter = require('express').Router()
const {Role} = require("../models/models")

roleRouter.post("/", async (req, res, next) => {
    const body = req.body

    const role = Role.build({
        abreviation: body.abreviation,
        description: body.description
    })

    try {
        const savedRole = await role.save()
        res.json({role: savedRole})
    } catch(error) {
        logger.error(error)
        res.status(500).json({errorCode: "CREATE_ERROR"})
    }
})

roleRouter.get("/", async (req, res, next) => {
    try {
        const roles = await Role.findAll();
        res.json({roles: roles})
    } catch(error) {
        logger.error(error)
        res.status(500).json({errorCode: "LOAD_ERROR"})
    }

})

module.exports = roleRouter