
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
    orders:{
        type:String,
    },
    location:{
        type:String
    },
    quantity:{
        type:String
    },
    type:{
        type:String
    },
    orders:{
        type:String
    },
    name:{
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
