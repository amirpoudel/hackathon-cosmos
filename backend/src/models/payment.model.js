const mongoose = require('mongoose');
const { ORDER_PAYMENT_STATUS } = require('../constants');

const paymentSchema = new mongoose.Schema({
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant'
    },
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order',
        unique:true
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


paymentSchema.pre('save', function (next) {
    if (!this.isNew && this.status === ORDER_PAYMENT_STATUS.PAID) {
        const error = new Error('Payment has already been paid. Update operation aborted.');
        error.status = 400;
        return next(error);
    }

    next();
});

paymentSchema.post('save', async function () {
    console.log('This is post save');

    console.log('Updating order with payment ID');
    try {
        const updatedOrder = await mongoose.model('Order').findByIdAndUpdate(
            this.orderId,
            { paymentId: this._id },
            { new: true }
        );
        console.log('Order updated:', updatedOrder);
    } catch (error) {
        console.error('Error updating order with payment ID:', error);
    }
});



const Payment = mongoose.model("Payment",paymentSchema);

module.exports = {Payment}