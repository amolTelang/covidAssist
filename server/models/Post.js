
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
    ordersPending:{
        type:String,
    },
    address:{
        type:String
    },
    ordersCompleted:{
        type:String
    },
    ratings:{
        type:String
    },
    availability:{
        type:String
    },
    phoneNo:{
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

});


//exporting the model
module.exports=mongoose.model(`post`,PostSchema); 
