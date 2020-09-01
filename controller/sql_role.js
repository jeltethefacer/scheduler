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
        res.json(savedRole)
    } catch(error) {
        next(error)
    }
})

roleRouter.get("/", async (req, res, next) => {
    const roles = await Role.findAll();
    res.json(roles)
})

module.exports = roleRouter