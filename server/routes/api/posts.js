const express = require('express');
const router=express.Router();
const auth=require('../../middleware/auth');
const Post=require('../../models/Post');
const User=require('../../models/User');


//@router POST api/posts/bds
//@desc post a BedShelter request 
//@access private
router.post('/bds',auth,async(req,res)=>{
    try {
        // const usrid=req.phone.user.id;
        const obj=req.user;
        const user=await User.findById(obj.id);
    
        const newPost=new Post({
            user:req.user.id,
            name:user.name,
            location:req.body.location,
            quantity:req.body.quantity,
            phone:req.body.phone,
            text:req.body.text,
            lastTimeVerified:req.body.lastTimeVerified
        });

        //return post object to database
        const post=await newPost.save();
        res.json(post);


    } catch (error) {
        console.error(error.message);98
        res.status(500).send('server error')
    }



});                                         

module.exports=router;