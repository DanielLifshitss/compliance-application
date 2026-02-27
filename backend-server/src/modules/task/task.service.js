const { taskRepository, taskQuestionaryRepository } = require('./task.repository');

const taskService = {
  // Tasks
  getAllTasks: async () => taskRepository.findAll(),

  getTaskById: async (taskId) => taskRepository.findById(taskId),

  createTask: async (data) => taskRepository.create(data),

  updateTask: async (taskId, data) => taskRepository.update(taskId, data),

  // Task Questionaries
  getAllTaskQuestionaries: async () => taskQuestionaryRepository.findAll(),

  getTaskQuestionaryById: async (questionaryId) =>
    taskQuestionaryRepository.findById(questionaryId),

  createTaskQuestionary: async (data) =>
    taskQuestionaryRepository.create(data),

  updateTaskQuestionary: async (questionaryId, data) =>
    taskQuestionaryRepository.update(questionaryId, data),
};

module.exports = taskService;