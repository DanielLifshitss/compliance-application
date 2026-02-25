const taskCollector = require('./task.controller')

const TaskQuestionay = {
    type:'object',
    properties:{
        _id: {type:'string'},
        questionTitle: {type: 'string'},
        questionDescription: {type: 'string'},
        answers: {
            type:'array',
            items: {
                question: {type: 'string'},
                isRight: {type: 'boolean'}
            }
        },
        createdAt: {
            type: 'string',
            format: 'date-time'
        },
        updatedAt: {
            type: 'string',
            format: 'date-time'
        },
    }
}

const Task = {
    type:'object',
    properties:{
        _id: {type:'string'},
        taskName: {type: 'string'},
        taskType: {type: 'string'},
        taskQuestionary: TaskQuestionay,
        exposeTaskWieght: {type: 'number'},
        isAccomplished: {type: 'boolean'},
        taskFilePath: {type: 'string'},
        createdAt: {
            type: 'string',
            format: 'date-time'
        },
        updatedAt: {
            type: 'string',
            format: 'date-time'
        },
    }
}

const getTasksOpts = {
    schema: {
            tags: ['Tasks'],
            summary: 'Get all Tasks',
            response: {
            200: {
                type: 'array',
                items: Task
            }
        }
    },
    handler: taskCollector.getTasks
}

const getTaskOpts = {
    schema: {
        tags: ['Task'],
        summary: 'Get task',
        response: {
        200: Tasks
        }
    },
    handler: taskCollector.getTask
}

const postTaskOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        questionTitle: {type: 'string'},
        questionDescription: {type: 'string'},
        answers: {
            type:'array',
            items: {
                question: {type: 'string'},
                isRight: {type: 'boolean'}
            }
        },
        createdAt: {
            type: 'string',
            format: 'date-time'
        },
        updatedAt: {
            type: 'string',
            format: 'date-time'
        },
      },
      required: ['taskName' , 'taskType'],
      additionalProperties: false
    }
  },
  handler: taskCollector.createTask
}

const postTaskQuestionaryOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        taskName: {type: 'string'},
        taskType: {type: 'string'},
        taskQuestionary: TaskQuestionay,
        exposeTaskWieght: {type: 'number'},
        isAccomplished: {type: 'boolean'},
        taskFilePath: {type: 'string'},
        createdAt: {
            type: 'string',
            format: 'date-time'
        },
        updatedAt: {
            type: 'string',
            format: 'date-time'
        },
      },
      required: ['taskName' , 'taskType'],
      additionalProperties: false
    }
  },
  handler: taskCollector.createTask
}

const getTaskQuestionaryOpts = {
    schema: {
            tags: ['Task'],
            summary: 'Get Task Questionary',
            response: {
            200: {
                type: 'array',
                items: TaskQuestionay
            }
        }
    },
    handler: taskCollector.getTaskQuestionary
}

const updateTaskOpts = {
    schema: {
        tags: ['Task'],
        summary: 'Update Task',
        response: {
        201: Task
        }
    },
    handler: taskCollector.updateTask
}

const updateTaskQuestionaryOpts = {
    schema: {
        tags: ['Task'],
        summary: 'Update Task Questionary',
        response: {
        201: TaskQuestionay
        }
    },
    handler: taskCollector.updateTaskQuestionary
}

module.exports = {
    getTasksOpts,
    getTaskQuestionaryOpts,
    getTaskOpts,
    postTaskOpts,
    postTaskQuestionaryOpts,
    updateTaskOpts,
    updateTaskQuestionaryOpts
}