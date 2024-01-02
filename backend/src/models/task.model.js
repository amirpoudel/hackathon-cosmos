const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restaurant",
        required:true
    },
    title:{
        type:String,
        required:true,
        lowercase:true,
        trim: true
    },
    isCompleted:{
        type:Boolean,
        default:false
    },

},{
    timestamps:true
})



const Task = mongoose.model("Task",taskSchema);

module.exports = {Task};