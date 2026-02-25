const mongoose = require('mongoose')

//Exposure Categories MongoDB Collection:
const exposureCategorySchema = new mongoose.Schema({
    companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Company"
        },
    categoryName: {
        type:String,
        maxLength: 100
    },
    risks:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Risk"
    }],
    exposureCategoryWeight: Number
})


module.exports = mongoose.model('ExposureCategory', exposureCategorySchema)