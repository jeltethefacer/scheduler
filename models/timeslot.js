const mongoose = require("mongoose")

const timeslotSchema = new mongoose.Schema({
    startTime: Date,
    length: Number,
    user: Number,
    TC: Boolean
})


timeslotSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = document._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Timeslot", timeslotSchema)