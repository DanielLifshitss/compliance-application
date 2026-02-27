const taskService = require('./task.service');

const taskCollector = {
  getTasks: async (req, reply) => {
    const tasks = await taskService.getAllTasks();
    reply.send(tasks);
  },

  getTask: async (req, reply) => {
    const task = await taskService.getTaskById(req.params.tasksId);
    if (!task) return reply.status(404).send({ error: 'Task not found' });
    reply.send(task);
  },

  createTask: async (req, reply) => {
    const task = await taskService.createTask(req.body);
    reply.status(201).send(task);
  },

  updateTask: async (req, reply) => {
    const task = await taskService.updateTask(req.params.tasksId, req.body);
    if (!task) return reply.status(404).send({ error: 'Task not found' });
    reply.status(201).send(task);
  },

  getTaskQuestionary: async (req, reply) => {
    const questionaries = await taskService.getAllTaskQuestionaries();
    reply.send(questionaries);
  },

  createTaskQuestionary: async (req, reply) => {
    const questionary = await taskService.createTaskQuestionary(req.body);
    reply.status(201).send(questionary);
  },

  updateTaskQuestionary: async (req, reply) => {
    const questionary = await taskService.updateTaskQuestionary(
      req.params.taskQuestionaryId,
      req.body
    );
    if (!questionary) return reply.status(404).send({ error: 'Task Questionary not found' });
    reply.status(201).send(questionary);
  }
};

module.exports = taskCollector;