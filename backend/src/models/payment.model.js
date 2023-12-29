const mongoose = require('mongoose');
const { ORDER_PAYMENT_STATUS } = require('../constants');

const paymentSchema = new mongoose.Schema({
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant'
    },
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order'
    },
    method:{
        type:String,
        trim:true
    },
    amount:{
        type:Number,
        min:[0,'Payment Amount cannot be less than 0']
    },
    status:{
        type:String,
        trim:true
    },
    
})


paymentSchema.pre("save",function(next){
    if(this.status === ORDER_PAYMENT_STATUS.PAID){
        const error = new Error("Payment has already been paid. Save operation aborted.");
        error.status = 400;
        return next(error)
    }
    next();
})

const Payment = mongoose.model("Payment",paymentSchema);

module.exports = {Payment}