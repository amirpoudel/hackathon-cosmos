
const ApiError = require("./ApiError")

const generateAccessAndRefreshTokens = async function (userModelInstance) {
    try {
        
        const accessToken = userModelInstance.generateAccessToken();
        const refreshToken = userModelInstance.generateRefreshToken();

        userModelInstance.refreshToken = refreshToken;
        await userModelInstance.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.log(error);
        throw new ApiError(
            500,
            'Something went wrong while generating refresh and access tokens'
        );
    }
};


module.exports = {generateAccessAndRefreshTokens}