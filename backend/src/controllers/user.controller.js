
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { Restaurant } = require('../models/restaurant.model');
const { User } = require('../models/user.model');
const { ROLES } = require('../constants');
const {generateAccessAndRefreshTokens} = require("../utils/auth");
const { uploadOnCloudinary } = require('../utils/cloudinary');

const registerOwnerAndRestaurant = asyncHandler(async (req,res,next)=>{
    // use transaction later

    const {restaurantName,restaurantUserName,ownerName,ownerEmail,ownerPhoneNumber,password} = req.body;
    console.log(req.body);

    if(!restaurantName || !restaurantUserName){
        throw new ApiError(400,"Please Provide Restaurant Information");
    }

    if(!ownerName || !ownerEmail || !ownerPhoneNumber || !password){
        throw new ApiError(400,"Please Provide Owner Information");
    }

    // restaurantImage
    let restaurantImagePath = req.file?.path;
    console.log("This is restaurant image path",restaurantImagePath);

    const restaurant = await  Restaurant.create({
        name:restaurantName,
        username:restaurantUserName,
    })

    if(restaurantImagePath){
        uploadOnCloudinary(restaurantImagePath).then((result)=>{
            if(!result) return;
            restaurant.profileImage = result.secure_url;
            restaurant.save();
        }).catch((err)=>{
            console.log(err);
        })
    }

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



const loginUser = asyncHandler(async (req, res) => {
    const {phoneNumber, password } = req.body;

    // check if employee exist
    const user = await User.findOne({
        phone:phoneNumber
    });
    if (!user) {
        throw new ApiError(404, 'Invalid Phone or Password');
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        throw new ApiError(404, 'Invalid Phone or Password');
    }

    //generate token
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user);

    const userResponse = user
        .toObject()
        .excludeProperties(['password', 'refreshToken', 'updatedAt','restaurantId']);

        const options = {
            path: '/',
            httpOnly: true,
            secure: false, // Change this to false for local development
            sameSite: 'Lax', // Change to 'None' in production with HTTPS
          };

    return res
        .status(200)
        .cookie('refreshToken', refreshToken, options)
        .cookie('accessToken', accessToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: userResponse,
                },
                'User logged in successfully'
            )
        );
});


const validateToken = asyncHandler(async (req, res) => {
    const user = req.user;
    const userResponse = user
        .toObject()
        .excludeProperties(['password', 'refreshToken', 'updatedAt','restaurantId']);
    return res.status(200).json(
        new ApiResponse(200, userResponse, 'Valid Token')
    );
});




const user = {
    registerOwnerAndRestaurant,
    loginUser,
    validateToken
}
module.exports = user;

