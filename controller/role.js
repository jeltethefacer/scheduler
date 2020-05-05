const roleRouter = require('express').Router()
const Role = require("../models/role")

roleRouter.post("/", async (req, res, next) => {
    const body = req.body

    const role = new Role({
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

module.exports = roleRouter