const mongoose = require('mongoose')

//Industry MongoDB Collection:
const industrySchema = new mongoose.Schema({
    industryName: String,
    exposureCategories:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ExposureCategory"
    }],
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    }
})

module.exports = mongoose.model("Industry", industrySchema)