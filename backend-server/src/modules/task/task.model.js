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
    }]
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
    isAccomplished: Boolean,
    taskFilePath: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"File"
    },
    exposeTaskWieght: Number 
})

module.exports = mongoose.model('Task', taskSchema), mongoose.model('TaskQuestionary', questionaySchema)