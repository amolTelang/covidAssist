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
    }

});

//exporting user module
module.exports=mongoose.model(`user`,UserSchema); 