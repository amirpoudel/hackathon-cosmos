// import { ApiError } from "./ApiError.js";
// import { MongooseError } from "mongoose";
// import {MongoError} from "mongodb";
const ApiError = require("./ApiError")
const {MongooseError} = require("mongoose");
const {MongoError}  = require("mongodb");



// Custom Global Error Handling Middleware
const errorHandler = (err, req, res, next) => {


    if (err instanceof ApiError) {
        // Handle custom ApiError
        return res.status(err.statusCode).json({ success: false, error: err.message, errors: err.errors });
    }
    if(err instanceof MongooseError) {
        // Handle mongoose errors
        return res.status(400).json({ success: false, error: err.message, errors: err.errors });
    }
    if(err instanceof MongoError) {
        // Handle mongodb errors
        return res.status(400).json({ success: false, error: err.message, errors: err.errors });
    }
    if(err instanceof Error){
        // Handle other errors - customs error 
        return res.status(400).json({ success: false, error: err.message, errors: err.errors });
    }
    

   
    // Handle other errors
    console.error("Non API ERROR",err); // Log the error for debugging
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
    
};


module.exports = errorHandler;