
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const { MenuCategory, MenuItem } = require('../models/menu.model');
const {updateOnClodinary, uploadOnCloudinary, deleteFromCloudinary} = require("../utils/cloudinary");
const { Restaurant } = require('../models/restaurant.model');
// Menu Category

const checkMenuCategoryId = asyncHandler(async (req, res, next) => {
    const { categoryId } = req.body;
    const restaurantId = req.user.restaurantId;
    console.log(req.body);
    if (!categoryId || !restaurantId) {
        throw new ApiError(400, 'Restaurant Id and Category Id is required');
    }
    const category = await MenuCategory.findOne({
        _id: categoryId,
        restaurantId: restaurantId,
    });
    if (!category) {
        throw new ApiError(400, 'Restaurant Id or Category Id is invalid');
    }
    next();
})

const createMenuCategory = asyncHandler(async (req, res, next) => {
    const {category, categoryDescription } = req.body;
    const restaurantId = req.user.restaurantId;
    console.log(req.body);
    if (!category ) {
        throw new ApiError(400, 'missing required fields');
    }

    const categoryResponse = await MenuCategory.create({
        restaurantId: restaurantId,
        name: category,
        description: categoryDescription,
    });

    if(!categoryResponse){
        throw new ApiError(500,"Unable to create category");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                categoryResponse,
                'category created successfully'
            )
        );
});

const getMenuCategory = asyncHandler(async (req, res) => {

    const restaurantId = req.user.restaurantId;
    const categories = await MenuCategory.find({ restaurantId: restaurantId });
    console.log("THis is Category",categories);
    console.log(typeof categories)

    console.log(Array.isArray(categories)); // This should log 'true' if categories is an array

    return res.status(200).json(new ApiResponse(200, categories, 'Success'));

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


// Menu Items

const createMenuItem = asyncHandler(async (req, res, next) => {
    const {
        categoryId,
        name,
        price,
        discountPercentage,
        description,      
        isVeg,
        containsEggs,
        isSpecial,
        isRecommended,
        isAvailable
    } = req.body;

    console.log(req.body);
    const restaurantId = req.user.restaurantId;

    // item image can only single
    const localFilePath = req?.file?.path;

    if (!categoryId || !name || !price) {
        throw new ApiError(400, 'missing required fields');
    }

    const itemResponse = await MenuItem.create({
        restaurantId: restaurantId,
        categoryId: categoryId,
        name: name,
        price: price,
        discountPercentage: discountPercentage || 0,
        description: description,
        imageLink: null,
        flags: {
            isVeg: isVeg || false,
            containsEggs: containsEggs || false,
            isSpecial: isSpecial || false,
            isRecommended: isRecommended || false,
            isAvailable: isAvailable || true,
        },
    });

    if (itemResponse) {
        console.log('Item created successfully');
        uploadOnCloudinary(localFilePath)
            .then((response) => {
                itemResponse.imageLink = response?.secure_url || null;
                itemResponse.save();
                console.log('Item image uploaded successfully');
                console.log(itemResponse);
            })
            .catch((error) => {});
    }

    return res
        .status(200)
        .json(new ApiResponse(200, itemResponse, 'Item created successfully'));
});

const getMenuItem = asyncHandler(async (req, res, next) => {
    
    const { categoryId } = req.body;
    const restaurantId = req.user.restaurantId;
    
    const menuItems = await MenuItem.find({
        categoryId: categoryId,
        restaurantId: restaurantId,
    })

    return res.status(200).json(new ApiResponse(200, menuItems, 'Success'));
});



const updateMenuItem = asyncHandler(async (req, res, next) => {
    const {
        itemId,
        name,
        price,
        discountPercentage,
        description,      
        isVeg,
        containsEggs,
        isSpecial,
        isRecommended,
        isAvailable
    } = req.body;
    const restaurantId = req.user.restaurantId;
    if(!itemId || !restaurantId){
        throw new ApiError(400, 'Restaurant Id and Item Id is required');
    }

    const updateResponse = await MenuItem.findByIdAndUpdate(itemId,{
        $set:{
            name:name,
            price:price,
            discountPercentage:discountPercentage,
            description:description,
            flags:{
                isVeg:isVeg,
                containsEggs:containsEggs,
                isSpecial:isSpecial,
                isRecommended:isRecommended,
                isAvailable:isAvailable
            }
        }
    },{new:true})

    console.log(updateResponse);

    return res.status(200).json(new ApiResponse(200, updateResponse, 'Successfully updated'))

    })


const updatedMenuItemImage = asyncHandler(async (req, res, next) => {

    const restaurantId = req.user.restaurantId;
    const {itemId,imageLink} = req.body;
    if(!imageLink){
        throw new ApiError(400, 'Bad Request');
    }
    const localFilePath = req?.file?.path;
    if(!localFilePath){
        throw new ApiError(400, 'Please Upload Image');
    }

    // find item
    const item = await MenuItem.findOne({_id:itemId,restaurantId:restaurantId});
    if(!item){
        throw new ApiError(400, 'Item Id is invalid');
    }

    updateOnClodinary(localFilePath,imageLink).then((response)=>{
        item.imageLink = response?.secure_url || null;
        item.save();
        console.log('Item image uploaded successfully');
        console.log(item);
    })
    //find way to send updated link - without waiting

    // avoid sending unnessary response
    return res.status(200).json(new ApiResponse(200, [], 'Successfully updated'))



})

//delete menu need to be working and solve the issue of post middleware
const deleteMenuItem = asyncHandler(async (req, res, next) => {
    const { itemId } = req.body;
    const restaurantId = req.user.restaurantId;
    if (!itemId  || !restaurantId) {
        throw new ApiError(400, 'Restaurant Id And Item Id is required');
    }
 
    const deletedMenuItem = await MenuItem.findByIdAndDelete(itemId);
    if(!deletedMenuItem){
        throw new ApiError(400, 'Restaurant Id, Category Id or Item Id is invalid');
    }
    // delete image from cloudinary
    deleteFromCloudinary(deletedMenuItem.imageLink).then((response)=>{
        console.log('Item image deleted successfully');
    });

    console.log(deletedMenuItem);
    return res.status(200).json(new ApiResponse(200, deletedMenuItem, 'Successfully deleted'));

});


const deleteMenuItemImage = asyncHandler(async (req, res, next) => {
    /* Algo
        find item
        check image link is valid
        delete from cloudinary 
        set db image link to null

    */
    const { itemId, imageLink } = req.body;
    const restaurantId = req.user.restaurantId;
    if(!itemId || !imageLink){
        throw new ApiError(400, 'Bad Request');
    }
    
    const item = await MenuItem.findOne({_id:itemId,restaurantId:restaurantId});
    if(!item){
        throw new ApiError(400, 'Item Id is invalid');
    }
    if(imageLink !== item.imageLink){
        throw new ApiError(400, 'Image Link is invalid');
    }
    deleteFromCloudinary(imageLink).then((response)=>{
        item.imageLink = null;
        item.save();
        console.log('Item image deleted successfully');
        console.log(item);
    })
   // avoid sending unnessary response
    return res.status(200).json(new ApiResponse(200, [], 'Successfully deleted'));

})




const getMenu = asyncHandler(async (req, res, next) => {
    
    const {restaurantUsername,tableNumber} = req.params;
    console.log(restaurantUsername);
    console.log("Iam am here");
    if(!restaurantUsername){
        throw new ApiError(400, 'Restaurant Username is required');
    }
    const restaurantId = await Restaurant.findOne({username:restaurantUsername}).select("_id");
    const table = await Table.findOne({restaurantId:restaurantId._id,tableNumber:tableNumber}).select("_id");
    if(!table){
        throw new ApiError(400, 'Table Number is invalid');
    }

    if(!restaurantId){
        throw new ApiError(400, 'Restaurant Username is invalid');
    }
    console.log("This is restaurant id",restaurantId);

    let menu  = await MenuCategory.aggregate([
        {
            $match: {
                restaurantId: restaurantId._id,
            },          
        },
        {
          $lookup: {
            from: "menuitems",
            localField: "_id",
            foreignField: "categoryId",
            as: "items",
          },
        },
        {
         $addFields:{
           
            itemsCount:{$size:"$items"}

         }
        },
        {
            $project:{
                name:1,
                description:1,
                imageLink:1,
                itemsCount:1,
                items:{
                    name:1,
                    description:1,
                    price:1,
                    imageLink:1,
                    flags:1
                }
            }
        }
      ])
    console.log("This is Menu Aggregation",menu)
    return res.status(200).json(new ApiResponse(200, menu, 'Successfully fetched menu'))

});



const menu = {
    checkMenuCategoryId,
    createMenuCategory,
    getMenuCategory,
    updateMenuCategory,
    createMenuItem,
    updateMenuItem,
    getMenuItem,
    updatedMenuItemImage,
    deleteMenuItem,
    deleteMenuItemImage,
    getMenu,
   

}

module.exports = menu