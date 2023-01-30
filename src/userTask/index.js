const taskService = require('./task.service');
const taskController = require('./task.controller');
const tasksRoutes = require('./task.route');

module.exports = { taskService, taskController, tasksRoutes };