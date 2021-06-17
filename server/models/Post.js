
//importing mongoose
const mongoose=require('mongoose');
//setting up schema
const Schema=mongoose.Schema;
//creating the Post object
const PostSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    userName:{
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
    typeOfMedicine:{
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
    },
    otype:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }

});


//exporting the model
module.exports=mongoose.model(`post`,PostSchema); 