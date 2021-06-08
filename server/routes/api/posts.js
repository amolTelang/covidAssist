const express = require('express');
const router=express.Router();
const auth=require('../../middleware/auth');
const Post=require('../../models/Post');
const User=require('../../models/User');



//@router GET api/posts/shelter
//@desc get all posts specific to shelter  from the collections
//@access private
router.get('/shelter',auth,async(req,res)=>{
    try {
        const posts=await Post.find().sort({date :-1});
        res.json(posts);  
    } catch (error) {
       console.error(error.message);
       res.status(500).send('server error');
    }
});

//@router GET api/posts/
//@desc get all posts specific to oxygen  from the collections
//@access private
router.get('/oxygen',auth,async(req,res)=>{
    try {
        const posts=await Post.find().sort({date :-1});
        res.json(posts);  
    } catch (error) {
       console.error(error.message);
       res.status(500).send('server error');
    }
});

//@router GET api/posts/
//@desc get all posts specific to medicine the collections
//@access private
router.get('/medicine',auth,async(req,res)=>{
    try {
        const posts=await Post.find().sort({date :-1});
        res.json(posts);  
    } catch (error) {
       console.error(error.message);
       res.status(500).send('server error');
    }
});


//@router POST api/posts/bds
//@desc post a BedShelter request 
//@access private
router.post('/shelterAssist',auth,async(req,res)=>{
    try {
       
        const user=await User.findById(req.user.id);
    
        const newPost=new Post({
            user:req.user.id,
            name:req.body.name,
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


//@router POST api/posts/bds
//@desc post a BedShelter request 
//@access private
router.post('/oxygenAssist',auth,async(req,res)=>{
    try {
       
        const user=await User.findById(req.user.id);
    
        const newPost=new Post({
            user:req.user.id,
            name:req.body.name,
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

//@router POST api/posts/bds
//@desc post a BedShelter request 
//@access private
router.post('/medicineAssist',auth,async(req,res)=>{
    try {
       
        const user=await User.findById(req.user.id);
    
        const newPost=new Post({
            user:req.user.id,
            name:re.body.name,
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