const { Task } = require("../models/task.model");


async function createTask(restaurantId, title) {
    
     return await Task.create({ restaurantId, title });
}


async function getTasks(restaurantId, condition = {}){
    return await Task.aggregate([
        { $match: { restaurantId, isCompleted: false, ...condition } },
        { $unionWith: { coll: 'tasks', pipeline: [{ $match: { restaurantId, isCompleted: true, ...condition } }] } }
    ]);
}

async function updateTaskStatus(restaurantId,taskId,isCompleted){
    return await Task.findOneAndUpdate({
        restaurantId,
        _id:taskId
    },{
        isCompleted
    },{
        new:true
    })
}


async function deleteTask(restaurantId,taskId){
    return await Task.findOneAndDelete({
        restaurantId,
        _id:taskId
    })
}

const taskService = {
    createTask,
    getTasks,
    updateTaskStatus,
    deleteTask

}

module.exports = taskService;