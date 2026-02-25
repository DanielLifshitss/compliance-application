const mongoose = require('mongoose')

//User MongoDB Collection:
const userSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    phoneNumber: String,
    companyId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:"Company"
    },
    role_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:"Role"
    },
    userType:{
        type: String,
        enum: ['Buyer', 'Champion', 'Access'],
        default: 'Access'
    },
    email: {
        type: String,
        minLength:10,
        required: true,
        lowercase: true
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
    },
})

//Supervisor MongoDB Collection:
const supervisorSchema = new mongoose.Schema({
    supervisorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    empolies:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]

})


module.exports = mongoose.model("User", userSchema), mongoose.model('Supervisor', supervisorSchema)