const mongoose=require('mongoose');

const PostSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    name:{
        type:String,
    },
    location:{
        type:String
    },
    quantity:{
        type:String
    },
    address:{
        type:String
    },
    phno:{
        type:String
    },
    type:{
        type:String
    },
    price:{
        type:String
    },
    homedelivery:{
        type:String
    },
    docrequired:{
        type:String
    },
    text:{
        type:String
    }




});

module.exports=Post=mongoose.model(`post`,PostSchema); 