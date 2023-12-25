const mongoose = require('mongoose')


const addressSchema = new mongoose.Schema({
    country: {
        type: String,
        default: 'nepal',
        lowercase: true,
        trim: true,
    },
    province: {
        type: String,
        trim: true,
        lowercase: true,
        index: true,
    },
    district: {
        type: String,
        trim: true,
        lowercase: true,
        index: true,
    },
    municipality: {
        type: String,
        trim: true,
        lowercase: true,
        index: true,
    },
    ward: {
        type: Number,
        trim: true,
        lowercase: true,
        index: true,
    },
    street: {
        type: String,
        trim: true,
        lowercase: true,
    },
    pincode: {
        type: String,
        trim: true,
        lowercase: true,
        minlength: [6, 'Pincode cannot be less than 6 characters'],
        maxlength: [20, 'Pincode cannot be greater than 20 characters'],
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            index: '2dsphere',
        },
    },
})


module.exports = {
    addressSchema
}