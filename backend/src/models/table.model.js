const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
    },
    tableNumber: {
        type: Number,
        required: true,
        unique: true,
        min: [1, 'Table Number cannot be less than 1'],
        max: [100, 'Table Number cannot be greater than 100'],
    },
    capacity: {
        type: Number,
        min: [1, 'Capacity cannot be less than 1'],
    },
    status:{
        type:String,
    }
    
})


const Table = mongoose.model('Table', tableSchema);

module.exports = {Table};