const express = require('express');
const router = express.Router();

const taskController =  require('./task.controller');
const authenticate = require('../../middleware/resultAuth');

router.post('/add',authenticate,taskController.addTask);

router.get('/get',authenticate,taskController.getTask);

router.get('/update/:taskId',authenticate,taskController.getUpdateTask);
router.post('/update/:taskId',authenticate,taskController.updateTask);

router.get('/delete/:taskId',authenticate,taskController.deleteTask);
router.delete('/delete/all',authenticate,taskController.deleteAllTask);

router.get('/get/search',authenticate,taskController.searchTask);
router.get('/search/taskstatus',authenticate,taskController.searchTaskStatus);

module.exports= router;