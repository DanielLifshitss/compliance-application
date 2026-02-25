const taskValidation = require('./task.validation')

async function taskRoutes(fastify, options) {
      //Get tasks
    fastify.get('/tasks', taskValidation.getTasksOpts)

    //Get task questionary
    fastify.get('/tasks/task-questionary/:taskQuestionaryId', taskValidation.getTaskQuestionaryOpts)

    //Get tasks
    fastify.get('/tasks/:tasksId', taskValidation.getTaskOpts)

    //Create tasks
    fastify.post('/tasks', taskValidation.postTaskOpts)

    //Get create task questionary
    fastify.post('/tasks/task-questionary/:taskQuestionaryId', taskValidation.postTaskQuestionaryOpts)

    //Update tasks
    fastify.put('/tasks/:tasksId', taskValidation.updateTaskOpts)

    //Get update task questionary
    fastify.put('/tasks/task-questionary/:taskQuestionaryId', taskValidation.updateTaskQuestionaryOpts)
}

module.exports = {
    taskRoutes
}