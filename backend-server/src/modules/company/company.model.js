const mongoose = require('mongoose')

//Company MongoDB Collection:
const companySchema = new mongoose.Schema({
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Tenant"
    },
    companyName: {
        type: String,
        maxLenght:100,
        minLenght:2
    },
    companyIndustryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Industry"
    },
    companyWebsiteUrl: {
        type: String,
        maxLenght:100,
        minLenght: 10,
        validate: {
            validator: str => /^https?:\/\/.+\..+/.test(str),
            message: props => `${props.value} is not a valid URL`
        }

    },
    country:{
        type: String,
        enum: ['Israel', 'United States', 'United Kingdom', 'Somaliland'],
        default: 'Israel'
    },
    language:{
        type:String,
        enum: ['Hebrew', 'English (US)', 'English (UK', 'Arabic'],
        default: 'Hebrew'
    },
    activate:Boolean,
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

module.exports = mongoose.model("Company", companySchema)