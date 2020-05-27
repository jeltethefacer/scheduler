const mongoose = require("mongoose")

const timeslotCategorieSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 3
    },
    cancelLength: {
        type: Number,
        required: true
    }
})


timeslotCategorieSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = document._id.toString()
        
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("TimeslotCategorie", timeslotCategorieSchema)