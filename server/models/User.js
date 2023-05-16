const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },

    password : {
        type : String,
        required : true,
    }, 

    day_of_birth : {
        type : Number,
        required : true,
    },

    month_of_birth : {
        type : Number,
        required : true,
    },

    year_of_birth : {
        type : Number,
        required : true,
    },

    country : {
        type : String,
        required : false,
    },

    tnc : {
        type : Boolean,
        required : true,
    },
    firstName : {
        type : String,
    },
    lastName : {
        type : String,
    },

    member_since : {
        type : Date,
        required : true,
        default : new Date().toLocaleDateString(),
    },

    phone : {
        type : Number,
        required : false,
    },

    articles : {
        type : [{article : String}]
    },
    

});

const User = mongoose.model('User', UserSchema);

module.exports = User;