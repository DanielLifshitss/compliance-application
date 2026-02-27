const Task = require('./task.model'); 
const TaskQuestionary = require('./task.model');

const taskRepository = {
  findAll: async () => Task.find(),
  findById: async (id) => Task.findById(id),
  create: async (data) => Task.create(data),
  update: async (id, data) => Task.findByIdAndUpdate(id, data, { new: true }),
};

const taskQuestionaryRepository = {
  findAll: async () => TaskQuestionary.find(),
  findById: async (id) => TaskQuestionary.findById(id),
  create: async (data) => TaskQuestionary.create(data),
  update: async (id, data) => TaskQuestionary.findByIdAndUpdate(id, data, { new: true }),
};

module.exports = {
  taskRepository,
  taskQuestionaryRepository
};