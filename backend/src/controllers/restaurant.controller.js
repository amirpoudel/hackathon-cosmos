
const {Restaurant} = require("../models/restaurant.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const {TABLE_STATUS} = require("../constants");
const { getLimitAndOffset } = require("../utils/helperFunctions");


const checkRestaurantUsername = asyncHandler(async (req,res,next)=>{
    const {restaurantUsername} = req.params;
    console.log("this is restaurant username",restaurantUsername);
    const restaurant = await Restaurant.findOne({username:restaurantUsername});
    if(!restaurant){
        throw new ApiError(400,"Restaurant Not Found");
    }
    req.restaurant = restaurant;
    next();
})

const getRestaurant = asyncHandler(async (req,res)=>{
    const [limit,offset] = getLimitAndOffset(req);
    let search = req.query?.search || "";

    const restaurants = await Restaurant.aggregate([
        {
            $match: {
                name: { $regex: `${search}`, $options: "i" }
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                username: 1,
                status: 1,
                profileImage:1,
                ownerId: 1
            }
        },
        {
            $limit: limit
        },
        {
            $skip: offset
        },
        {
            $lookup: {
                from: "users",  // Assuming the owner collection is named "users"
                localField: "ownerId",
                foreignField: "_id",
                as: "owner",
                pipeline:[
                    {
                        $project:{
                            _id:0,
                            phone:1,
                            email:1
                        }
                    }
                ]
            }
        },
        {
            $unwind: "$owner"
        },
        {
            $project: {
                _id: 1,
                name: 1,
                username: 1,
                status: 1,
                profileImage:1,
                phone: "$owner.phone",
                email: "$owner.email",
            }
        }
    ]);
    
    if(restaurant.length === 0){
        throw new ApiError(400,"Restaurants not found");
    }

    return res.status(200).json(new ApiResponse(200,restaurants,"Restaurants fetched successfully"));
    
})

const restaurant = {
    checkRestaurantUsername,
    getRestaurant
}

module.exports = restaurant;
