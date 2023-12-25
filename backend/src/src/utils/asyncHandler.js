const asyncHandler = function (requestHandler) {
    return async (req, res, next) => {
        try {
            await Promise.resolve(requestHandler(req, res, next));
        } catch (error) {
            next(error);
        }
    };
};



module.exports = asyncHandler;