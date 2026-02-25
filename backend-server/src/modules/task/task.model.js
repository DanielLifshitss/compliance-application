const mongoose = require('mongoose')


//Task Questionaries MongoDB Collection:
const questionaySchema = mongoose.Schema({
    questionTitle: String,
    questionDescription: {
        type:String,
        maxLength:150
    },
    answers:[{
        question:String,
        isRight:Boolean
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

//Tasks MongoDB Collection:
const taskSchema = mongoose.Schema({
    taskName:{
        type:String,
        maxLength:75
    },
    taskType:{
        type: String,
        enum: ['videoTask','approvalTask', 'quizzTask', 'regularTask','fileTask'],
        default: 'regularTask'
    },
    taskQuestionary: questionaySchema,
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
    isAccomplished: {
        type: Boolean,
        default: false
    },
    taskFilePath: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"File"
    },
    exposeTaskWieght: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model('Task', taskSchema), mongoose.model('TaskQuestionary', questionaySchema)