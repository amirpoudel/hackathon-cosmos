const mongoose = require('mongoose');

const {Payment} = require("../models/payment.model");


async function createPayment({orderId,method,amount,status}){
    return await Payment.create({
        orderId,
        method,
        amount,
        status
    })
}

module.exports = {createPayment}