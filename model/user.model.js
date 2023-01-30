const mongoose = require('mongoose');
const AutoIncrementFactory = require('mongoose-sequence');
const AutoIncrement = AutoIncrementFactory(mongoose);

const Schema = mongoose.Schema;
const userModel = new Schema(
    {
        userId:{
            type:Number,
            require:true,
            unique:true
        },
        googleUserId:{
            type:String,
            require:true,
        },
        userFirstName:{
            type:String,
            require:true,
        },
        userLastName:{
            type:String,
            require:true,
            default:"-"
        },
        userEmail: {
            type: String, 
            require:true, 
            unique:true, 
        },
        userPassword: {
            type: String,
        },
        userConfirmPassword: {
            type: String,
        },
        userPhoto:{
            type:String,
        },
        userBio:{
            type:String, 
        },
        token:{
            type:String,
        },
        resetTokenExpiration:{
            type:Date
        }
    }
);

userModel.plugin(AutoIncrement, { inc_field: 'userId' });

module.exports = mongoose.model('user',userModel);
