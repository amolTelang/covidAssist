const express = require('express');
const router=express.Router();
const auth=require('../../middleware/auth');
const Post=require('../../models/Post');
const User=require('../../models/User');


//@router POST api/posts/bds
//@desc post a BedShelter request 
//@access private
router.get('/bds',auth,async(req,res)=>{
    try {
        const user=await User.findById(req.user.id);
        
        const newPost=new Post({
            name:user.name,
            location:req.body.location,
            quantity:req.body.quantity,
            phno:req.body.phno,
            text:req.body.text,
            lastTimeVerified:req.body.lastTimeVerified
        })

        //return post object to database
        const post=await newPost.save();
        res.json(post);

        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error')
    }



});

module.exports=router;