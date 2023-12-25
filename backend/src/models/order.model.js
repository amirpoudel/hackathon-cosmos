const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
    },
    tableId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table',
    },
    phoneNumber:{
        type:String,
        trim:true
    },
    orderItems: [
        {
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item',
            },
            quantity: {
                type: Number,
                min: [1, 'Quantity cannot be less than 1'],
            },
            price: {
                type: Number,
                min: [0, 'Price cannot be less than 0'],
            },
            totalAmount: {
                type: Number,
                min: [0, 'Total Amount cannot be less than 0'],
            },
        
        },
    ],
    totalAmount: {
        type: Number,
        min: [0, 'Total Amount cannot be less than 0'],
    },
    orderNote:{
        type:String,
        trim:true
    },
    status:{
        type:String,
    },
    paymentStatus:{
        type:String,
    },
},{
    timestamps:true

})


const Order = mongoose.model('Order', orderSchema);

module.exports = {Order};