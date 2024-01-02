const taskService = require("../services/task.service");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const createTaskHandler = asyncHandler(async (req, res) => {
    const {title } = req.body;
    const restaurantId = req.user.restaurantId;
    if(!title){
        throw new ApiError(400,"Title is required")
    }
    const task = await taskService.createTask(restaurantId, title);
    if(!task){
        throw new ApiError(500,"Task could not be created")
    }
    return res.status(200).json(
        new ApiResponse(200,task,"Task created successfully")
    )
})


const getTaskHandler = asyncHandler(async (req, res) => {
    const restaurantId = req.user.restaurantId;
    let condition = {};
    if(req.body.isCompleted){
        condition.isCompleted = req.body.isCompleted;
    }

    const tasks = await taskService.getTasks(restaurantId,condition);
    console.log(tasks);

    return res.status(200).json(
        new ApiResponse(200,tasks,"Tasks fetched successfully")
    )

})

const updateTaskStatusHandler = asyncHandler(async (req, res) => {
    const restaurantId = req.user?.restaurantId;
    const taskId = req.params?.taskId;
    const isCompleted = req.body?.isCompleted;
    if(!isCompleted){
        throw new ApiError(400,"isCompleted is required")
    }
    const task = await taskService.updateTaskStatus(restaurantId,taskId,isCompleted);
    console.log("Updated Task",task);
    if(!task){
        throw new ApiError(500,"Task could not be updated")
    }
    return res.status(200).json(
        new ApiResponse(200,task,"Task updated successfully")
    )
})

const deleteTaskHandler = asyncHandler(async (req, res) => {
    const restaurantId = req.user?.restaurantId;
    const taskId = req.params?.taskId;
    const task = await taskService.deleteTask(restaurantId,taskId);
    console.log("Deleted Task",task);
    if(!task){
        throw new ApiError(400,"Task could not be deleted")
    }
    return res.status(200).json(
        new ApiResponse(200,task,"Task deleted successfully")
    )
})

const task = {
    createTaskHandler,
    getTaskHandler,
    updateTaskStatusHandler,
    deleteTaskHandler
}


module.exports = task;