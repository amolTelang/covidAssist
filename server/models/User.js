const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
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

module.exports=User=mongoose.model(`user`,UserSchema); 