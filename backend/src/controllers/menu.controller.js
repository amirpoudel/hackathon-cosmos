
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const { MenuCategory } = require('../models/menu.model');
// Menu Category

const createMenuCategory = asyncHandler(async (req, res, next) => {
    const {categoryName, categoryDescription } = req.body;
    const restaurantId = req.user.restaurantId;
   
    if (!categoryName || !categoryDescription) {
        throw new ApiError(400, 'missing required fields');
    }

    const categoryResponse = await MenuCategory.create({
        restaurantId: restaurantId,
        name: categoryName,
        description: categoryDescription,
    });

    if(!categoryResponse){
        throw new ApiError(500,"Unable to create category");
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                200,
                categoryResponse,
                'category created successfully'
            )
        );
});

const getMenuCategory = asyncHandler(async (req, res) => {
    
});

const updateMenuCategory = asyncHandler(async (req, res, next) => {
    const { categoryId, categoryName, categoryDescription } = req.body;

    const restaurantId = req.user.restaurantId;
    if(!categoryId || !restaurantId){
        throw new ApiError(400, 'Restaurant Id and Category Id is required');
    }

    console.log(categoryName,categoryDescription)

    const updateResponse = await MenuCategory.findByIdAndUpdate(categoryId,
        {
            $set:{
                name:categoryName,
                description:categoryDescription
            }
        },
        {new:true}
    )

    if(!updateResponse){
        throw new ApiError(500,"Unable to update category");
    }

    return res.status(200).json(new ApiResponse(200, updateResponse, 'Successfully updated'))
})


const deleteMenuCategory = asyncHandler(async(req,res,next)=>{
    
})


const createMenuItem = asyncHandler(async (req,res,next)=>{
    
})


const menu = {
    createMenuCategory,
    getMenuCategory,
    updateMenuCategory

}

module.exports = menu