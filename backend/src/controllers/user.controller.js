
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { Restaurant } = require('../models/restaurant.model');
const { User } = require('../models/user.model');
const { ROLES } = require('../constants');

const registerOwnerAndRestaurant = asyncHandler(async (req,res,next)=>{

    const {restaurantName,restaurantUsername,ownerName,ownerEmail,ownerPhoneNumber,password} = req.body;

    if(!restaurantName || !restaurantUsername){
        throw new ApiError(400,"Please Provide Restaurant Information");
    }

    if(!ownerName || !ownerEmail || !ownerPhoneNumber || !password){
        throw new ApiError(400,"Please Provide Owner Information");
    }

    /*
        first register restaurant 
        second register owner
        and update restaurant owner name
    */

    const restaurant = await  Restaurant.create({
        name:restaurantName,
        username:restaurantUsername,
    })
    if(!restaurant){
        throw new ApiError(500,"Unable To Register")
    }

    console.log("This is restaurant",restaurant);
    const owner = await User.create({
        restaurantId:restaurant._id,
        name:ownerName,
        email:ownerEmail,
        phone:ownerPhoneNumber,
        password:password,
        role:ROLES.ADMIN
    })
    if(!owner){
        throw new ApiError(500,"Unable To Register")
    }
    console.log("This si Owner");
    restaurant.ownerId = owner._id;
    restaurant.save();

    return res.status(200).json(new ApiResponse(200,[],"Successfully Register")) 

})





const user = {
    registerOwnerAndRestaurant
}
module.exports = user;

