
const asyncHandler = require('../utils/asyncHandler');
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const { User } = require('../models/user.model');

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer",""); // header for mobile
        if (!token) {
            throw new ApiError(401, 'Unauthorized request');
        }
    
        const decode = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRECT);
        
        // can find user form db and attach to req
        // find user from db
        const user = await User.findById(decode._id);
        if(!user){
            throw new ApiError(401,"Invalid Token")
        }
        console.log("this is user inside verify jwt",user)
        req.user = user;
        console.log("this is decode ",decode)
        next();
    } catch (error) {
        throw new ApiError(401, error.message || "Invalid access Token");
    }
});



const verifyRole = (role)=>{
    return (req,res,next)=>{
        if(req.user.role !== role){
            throw new ApiError(403,"Forbidden")
        }
        next()
    }
}


module.exports = {
    verifyJWT,
    verifyRole
}