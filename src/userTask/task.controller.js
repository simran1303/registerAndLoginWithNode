const taskService = require('./task.service');
const {addTaskValidation}= require('../util/validation');

const addTask = async (req, res) => {
    try {
        const { taskDetail, taskStatus } = req.body;
        const userEmail = req.user.email;
        await addTaskValidation.validateAsync({taskDetail})
        const response = await taskService.addTask(userEmail, taskDetail, taskStatus);
         res.render('task/task',{response})
    } catch (error) {
        res.render('task/error',{err:error.message})
    }
}

const getTask = async (req, res) => {
    try {
        const userEmail = req.user.email;
        const response = await taskService.getTask(userEmail);
        //res.send(response);

         res.render('task/task',{response});
    } catch (error) {
        res.send(error.message)
    }

}


const getUpdateTask= async(req,res)=>{
    try {
        const {taskId} = req.params
        const response = await taskService.getUpdateTask(taskId)
        res.render('task/update',{response});
    } catch (error) {
        console.log(err)
    }
}
const updateTask = async (req, res) => {
    try {
        const { taskDetail, taskStatus } = req.body;
        const userEmail = req.user.email;
        const {taskId} = req.params
        const response = await taskService.updateTask(userEmail, taskDetail, taskStatus,taskId);
        //res.send(res)
        res.render('task/task',{response,message:'Successfully update'});
    }
    catch (error) {
        res.send(error.message)
    }
}


const deleteTask =async(req,res)=>{
    try {
        const userEmail = req.user.email;
        const {taskId} = req.params
        const response = await taskService.deleteTask(userEmail,taskId);
        res.render('task/task',{response,message:'successfully delete'});
        // res.send(response);
    } catch (error) {
        res.send(error.message);
    }
}


const deleteAllTask =async(req,res)=>{
    try {
        const userEmail = req.user.email;
        const response = await taskService.deleteAllTask(userEmail);
        //console.log(response)
         res.render('task/task',{response:false})
    } catch (error) {
        res.send(error.message)
    }
}


const searchTask = async(req,res)=>{
    try{
        const userEmail= req.user.email;
        const searchData= req.query.taskDetail;
        const response = await taskService.searchTask(userEmail,searchData);
        //  console.log(response)
        // res.send(response)
        res.render('task/task',{response});

    }
    catch(err){
        res.send(err)

    }
}

const searchTaskStatus=async(req,res)=>{
    try{
        const userEmail= req.user.email;
        const searchData= req.query.taskStatus;
        const response = await taskService.searchTaskStatus(userEmail,searchData);
        console.log(response)
        //  res.send(response)
         res.render('task/task',{response});

    }
    catch(err){
        res.send(err)

    }
}


 
module.exports = {
    addTask,
    getTask,
    getUpdateTask,
    updateTask,
    deleteTask,
    deleteAllTask,
    searchTask,
    searchTaskStatus
}