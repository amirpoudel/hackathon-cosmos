const { default: mongoose, model } = require('mongoose');
const {MenuCategory} = require('../models/menu.model');


async function getMenu(restaurantId){
    return await MenuCategory.aggregate([
        {
            $match: {
                restaurantId: new mongoose.Types.ObjectId(restaurantId)
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
                    _id:1,
                    name:1,
                    description:1,
                    price:1,
                    imageLink:1,
                    flags:1
                }
            }
        }
    ])
}


module.exports = {getMenu}