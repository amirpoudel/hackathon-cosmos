
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const {createPayment} = require("../services/payment.service");
const {isPaymentTypeValid, ORDER_PAYMENT_STATUS} = require("../constants");
const { Order } = require('../models/order.model');


const initiatePaymentHandler = asyncHandler(async (req,res)=>{
    const {orderId,paymentAmount,paymentMethod} = req.body;
    const restaurantId = req.restaurant._id;

    if(!orderId || !paymentAmount){
        throw new ApiError(400,"Please Provide Order Id and Amount");
    }
    if(!isPaymentTypeValid(paymentMethod)){
        throw new ApiError(400,"Invalid Payment Method");
    }
    //before create payment - check if order is valid and amount is greater than order value
    const order = await Order.findOne({_id:orderId,restaurantId}).select("totalAmount");
    if(!order){
        throw new ApiError(400,"Invalid Order");
    }
    console.log("This is order",order);
    console.log("This is paymentAmount",paymentAmount)
    if(Number(order.totalAmount ) !== Number(paymentAmount)){
        throw new ApiError(400,"Invalid Amount");
    }
    const payment = await createPayment({
        restaurantId,
        orderId,
        amount:paymentAmount,
        method:paymentMethod,
        status:ORDER_PAYMENT_STATUS.PAID
    })
    if(!payment){
        throw new ApiError(500,"Unable To Create Payment");
    }
    return res.status(200).json(new ApiResponse(200,payment,"Payment Created Successfully"));
})


const payment = {
    initiatePaymentHandler
}

module.exports = payment;