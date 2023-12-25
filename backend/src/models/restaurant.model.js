
const mongoose = require('mongoose');
const { addressSchema } = require('./commonSchema');

const restaurantSchema = new mongoose.Schema({
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    name: {
        type: String,
        trim: true,
        lowercase: true,
        minlength: [6, 'Name cannot be less than 6 characters'],
        maxlength: [50, 'Name cannot be greater than 50 characters'],
    },
    username:{
        type:String,
        trim:true,
        lowercase:true,
        unique:true,
        required:true,
        minlength:[6,"Username cannot be less than 6 characters"],
        maxlength:[20,"Username cannot be greater than 20 characters"],
    },

    resturantType: {
        type: String,
        trim: true,
        lowercase: true,
        minlength: [6, 'Resturant Type cannot be less than 6 characters'],
        maxlength: [20, 'Resturant Type cannot be greater than 20 characters'],
    },
    description: {
        type: String,
        trim: true,
        lowercase: true,
        minlength: [
            6,
            'Resturant Description cannot be less than 6 characters',
        ],
        maxlength: [
            200,
            'Resturant Description cannot be greater than 200 characters',
        ],
    },
    avatar: {
        type: String,
    },
    coverImage: {
        type: String,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        
    },
    contact:[
        {
            type:String,
            trim:true,
            lowercase:true,
           
        }
    ],
    address:addressSchema,

    employees:{
        type:[[mongoose.Schema.Types.ObjectId]],
        ref:"User",
    },

    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    },
   
},{
    timestamps:true

});


const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = {Restaurant};