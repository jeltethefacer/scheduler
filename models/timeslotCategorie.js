const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator')

const timeslotCategorieSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        unique: true
    },
    cancelLength: {
        type: Number,
        required: true
    },
    subscribeLength: {
        type: Number,
        default: 0
    }
})


timeslotCategorieSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = document._id.toString()
        
        delete returnedObject._id
        delete returnedObject.__v
    }
})
timeslotCategorieSchema.plugin(uniqueValidator)

module.exports = mongoose.model("TimeslotCategorie", timeslotCategorieSchema)