const Task = require('../../model/task.model');
const Counter = require('../../model/counter.model');
const mongo = require('../../lib/mongoose.manger');

mongo.connectDb();

const addTask = async (userEmail, taskDetail, taskStatus) => {
    try {
        const taskData = await Task.create({ userEmail, taskDetail, taskStatus });
        const data = getTask(userEmail)
        return data;
    } catch (err) {
        return err;
    }
};

const getTask = async (userEmail) => {
    try {
        const taskData = await Task.aggregate([
            {
                $match: {
                    userEmail: userEmail,
                },
            }
        ]);


        return taskData
    }
    catch (err) {
        return err
    }
};

const getUpdateTask = async (taskId) => {
    try {
        const data = await Task.findOne({ taskId });
        return data;
    } catch (error) {
        return error
    }
}

const updateTask = async (userEmail, taskDetail, taskStatus, taskId) => {
    try {
        const findUserTask = await Task.findOne({ taskId });
        if (!findUserTask) {
            return 'no task found';
        }

        if (!taskDetail) {
            taskDetail = findUserTask.taskDetail;
        }
        if (!taskStatus) {
            taskStatus = findUserTask.taskStatus;
        }
        const update = await Task.updateOne({ taskId }, {
            $set: { taskDetail, taskStatus }
        });

        const response = await getTask(userEmail);
        return response
    }
    catch (err) {
        return err
    }
};

const deleteTask = async (userEmail, taskId) => {
    try {
        const deleteData = await Task.deleteOne({ taskId });
        const response = await getTask(userEmail);
        return response
    }
    catch (err) {
        return err
    }
}

const deleteAllTask = async (userEmail) => {
    try {
        const deleteAll = await Task.deleteMany({ userEmail });
        const response = await getTask(userEmail);
        console.log(deleteAll)
        return response
    }
    catch (err) {
        return err
    }
}

const searchTask = async (userEmail, searchTask) => {
    try {
    const taskData = await Task.aggregate([
            {
                $match: {
                    $and: [{
                        taskDetail: { $regex: searchTask, $options: 'i' }
                    }, {
                        userEmail: userEmail
                    }
                    ]
                },
            }
        ]);
        return taskData
    } catch (error) {
        return error
    }
}

const searchTaskStatus = async (userEmail, searchTask) => {
    try {
        if (searchTask == "All Task") {
            const taskData = await getTask(userEmail)
            return taskData
        }
        const taskData = await Task.aggregate([
            {
                $match: {
                    $and: [{
                        taskStatus: searchTask,
                    }, {
                        userEmail: userEmail
                    }]
                },
            }
        ]);
        return taskData
    } catch (error) {
        return error
    }
}


module.exports = {
    addTask,
    getTask,
    getUpdateTask,
    updateTask,
    deleteAllTask,
    deleteTask,
    searchTask,
    searchTaskStatus,
}