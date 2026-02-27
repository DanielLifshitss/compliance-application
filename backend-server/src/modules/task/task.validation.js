const taskCollector = require('./task.controller');

const TaskQuestionary = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    questionTitle: { type: 'string' },
    questionDescription: { type: 'string' },
    answers: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          question: { type: 'string' },
          isRight: { type: 'boolean' }
        }
      }
    },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' }
  }
};

const Task = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    taskName: { type: 'string' },
    taskType: { type: 'string' },
    taskQuestionary: TaskQuestionary,
    exposeTaskWieght: { type: 'number' },
    isAccomplished: { type: 'boolean' },
    taskFilePath: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' }
  }
};

const getTasksOpts = {
  schema: {
    tags: ['Tasks'],
    summary: 'Get all Tasks',
    response: { 200: { type: 'array', items: Task } }
  },
  handler: taskCollector.getTasks
};

const getTaskOpts = {
  schema: {
    tags: ['Tasks'],
    summary: 'Get Task by ID',
    response: { 200: Task }
  },
  handler: taskCollector.getTask
};

const postTaskOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        taskName: { type: 'string' },
        taskType: { type: 'string' },
        taskQuestionary: TaskQuestionary,
        exposeTaskWieght: { type: 'number' },
        isAccomplished: { type: 'boolean' },
        taskFilePath: { type: 'string' }
      },
      required: ['taskName', 'taskType'],
      additionalProperties: false
    }
  },
  handler: taskCollector.createTask
};

const updateTaskOpts = {
  schema: {
    body: postTaskOpts.schema.body,
    response: { 201: Task }
  },
  handler: taskCollector.updateTask
};

const getTaskQuestionaryOpts = {
  schema: {
    tags: ['Tasks'],
    summary: 'Get Task Questionary',
    response: { 200: { type: 'array', items: TaskQuestionary } }
  },
  handler: taskCollector.getTaskQuestionary
};

const postTaskQuestionaryOpts = {
  schema: {
    body: TaskQuestionary,
    handler: taskCollector.createTaskQuestionary
  },
  handler: taskCollector.createTaskQuestionary
};

const updateTaskQuestionaryOpts = {
  schema: {
    body: TaskQuestionary,
    response: { 201: TaskQuestionary }
  },
  handler: taskCollector.updateTaskQuestionary
};

const getAllTaskQuestionariesOpts = {
  schema: {
    tags: ['TaskQuestionary'],
    summary: 'Get all Task Questionaries',
    response: {
      200: {
        type: 'array',
        items: TaskQuestionary
      }
    }
  },
  handler: taskCollector.getTaskQuestionary 
};
module.exports = {
  getTasksOpts,
  getTaskOpts,
  postTaskOpts,
  updateTaskOpts,
  getTaskQuestionaryOpts,
  postTaskQuestionaryOpts,
  updateTaskQuestionaryOpts
};