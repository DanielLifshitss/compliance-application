const mongoose = require('mongoose')

//Tenant MongoDB Collection
const tenantSchema = mongoose.Schema({
    tenantName: String,
    buyerId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:"User"
    },
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

module.exports = mongoose.model("Tenant", tenantSchema)