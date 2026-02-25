const mongoose = require('mongoose')

//Role MongoDB Collection:
const roleSchema = new mongoose.Schema({
    companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Company",
            default: null
        },
    industryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Industry"
    },
    roleName: {
        type: String,
        maxLength:30,
        minLength:3
    },
    roleDescription:{
        type: String,
        maxLength:150
    },
    exposureCategories:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ExposureCategory"
    }],
    specificRoleRisks: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Risk"
    }]
})

module.exports = mongoose.model("Role", roleSchema)