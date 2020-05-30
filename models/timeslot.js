const mongoose = require("mongoose")

const timeslotSchema = new mongoose.Schema({
    description: String,
    startTime: Date,
    endTime: Date,
    maxPeople: Number,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true
    }],
    subscribed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    timeslotCategorie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TimeslotCategorie",
        required: true
    }
})


timeslotSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = document._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Timeslot", timeslotSchema)