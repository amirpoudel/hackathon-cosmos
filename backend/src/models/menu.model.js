const mongoose = require("mongoose");

const menuCategorySchema = new mongoose.Schema({
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restaurant",
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        
    }
},{
    timestamps:true
})



const menuItemSchema = new mongoose.Schema({
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restaurant",
        required:true
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"MenuCategory",
        required:true
    },
    name:{
        type:String,
        required:true,
        lowercase:true,
        trim: true,
       
    },
    price:{
        type:Number,
        required:true
    },
    discountPercentage:{
        type:Number,
        min:[0,"Discount cannot be negative"],
        max:[100,"Discount cannot be greater than 100%"],
        default:0
    },
    description:{
        type:String,
        trim:true,
    },

    flags:{
        isVeg: {
            type: Boolean,
            default: false,
        },
        containsEggs: {
            type: Boolean,
            default: false,
        },
        isSpecial: {
            type: Boolean,
            default: false,
        },
        isRecommended: {
            type: Boolean,
            default: false,
        }, 
        isAvailable: {
            type: Boolean,
            default: true,
        },
    },
    imageLink: {
        type: String,
        validate: {
          validator: function (value) {
            //Skip validation if the value is null 
                if (value === null) {
                    return true;
                }
            // Basic URL validation using a regular expression
            const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
            return urlRegex.test(value);
          },
          message: 'Invalid URL format',
        },
    },

},{
    timestamps:true
})





const MenuCategory = mongoose.model("MenuCategory",menuCategorySchema);
const MenuItem = mongoose.model("MenuItem",menuItemSchema);


module.exports = {
    MenuCategory,
    MenuItem
}