const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { addressSchema } = require('./commonSchema');

const userSchema = new mongoose.Schema(
    {
        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Restaurant',
        },
        name: {
            type: String,
            trim: true,
            lowercase: true,
            minlength: [6, 'Name cannot be less than 6 characters'],
            maxlength: [20, 'Name cannot be greater than 20 characters'],
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            index: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            index: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
        address: addressSchema,
        role:{
            type:String,
            trim:true,
            lowercase:true,
            required:true,
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
        refreshToken: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
        _id: this._id,
        restaurantId:this.restaurantId,
        email: this.email, 
        name: this.name,
        role:this.role
        },
        process.env.ACCESS_TOKEN_SECRECT,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN_SECRECT, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
};






const User = mongoose.model('User', userSchema);

module.exports = { User };