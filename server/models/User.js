//importing mongoose
const mongoose=require('mongoose');
//creating schema
const Schema=mongoose.Schema
//creating user object
const UserSchema=new Schema({
    userName:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    orders:{
        type:String,
        required:true,
        unique:false
    },
    Address:{
        type:String,
        required:true,
        unique:true
    },
    Availablility:{
        type:Boolean,
        required:true
    },
    Reviews:{
        type:[]
        required:true
    },
    spaceLeft:{
        type:Integer,
        required:true
    },
    spaceUsed:{
        type:Integer,
        required:true
    },
    AmountReceived:{
        type:String,
        required:true
    },
});

//exporting user module
module.exports=mongoose.model(`user`,UserSchema); 
