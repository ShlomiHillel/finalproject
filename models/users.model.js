const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: false,
        max : 15,
        min: 2
    },
    userNumber: { 
        type: Number,
        required: true,
        unique: false
        // unique: true
    },

    type: {
        type: Number,
        required: true,
        unique: false,
        default : 1,

    },
    isActive: {
        type: Boolean,
        required: false,
        unique: false,
        default : true
    },
    date: {
        type: Date,
        required: false,
        unique: false,
        default : Date.now()
    }
})

const usermodel  = mongoose.model('users',userSchema);
module.exports= usermodel;

