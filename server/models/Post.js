const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const PostSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
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
    phone:{
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
    lastTimeVerified:{
        type:String
    },
    text:{
        type:String
    }

});

module.exports=mongoose.model(`post`,PostSchema); 