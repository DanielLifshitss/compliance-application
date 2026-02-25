const mongoose = require('mongoose')


//Risk MongoDB Collections:
const riskSchema = mongoose.Schema({
    riskName: {
        type: String,
        maxLength:50
    },
    exposureCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExposureCategory"
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    }],
    exposureRiskWeight: Number,
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },

})

module.exports = mongoose.model('Risk', riskSchema)