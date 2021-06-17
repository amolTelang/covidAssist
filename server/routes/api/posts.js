
//importing all the relevent modules
const express = require('express');
const router=express.Router();
const auth=require('../../middleware/auth');
const Post=require('../../models/Post');
const User=require('../../models/User');


//@router GET api/posts/
//@desc get all posts specific to oxygen  from the collections
//@access private
router.get('/oxygen',auth,async(req,res)=>{
    try {
        //get all the post related to oxygen requests
        const posts=await Post.find().find({otype:'oxygen'}).sort({date :-1});
        //return the object in the form of JSON
        res.json(posts);  
    } catch (error) {
        //display if any error
       console.error(error.message);
       res.status(500).send('server error');
    }
});

//@router GET api/posts/medicine
//@desc get all posts specific to medicine the collections
//@access private
router.get('/medicine',auth,async(req,res)=>{
    try {
        //get all the post related to medicine
        const posts=await Post.find().find({otype:'medicine'}).sort({date :-1});
        //return in the form of JSON
        res.json(posts);  
    } catch (error) {
        //display if any error
       console.error(error.message);
       res.status(500).send('server error');
    }
});

    


//@router POST api/posts/oxygenAssist
//@desc post a Oxygen request 
//@access private
router.post('/oxygenAssist',auth,async(req,res)=>{
    try {
        //set the type of post
        const otype="oxygen";
        //find all the details specific to the user of the post
        const user=await User.findById(req.user.id);
        //create a new onject from Post and populate it with the details from request object
        const newPost=new Post({
            user:req.user.id,
            price:req.body.price,
            userName:req.body.userName,
            location:req.body.location,
            quantity:req.body.quantity,
            phone:req.body.phone,
            homedelivery:req.body.homedelivery,
            lastTimeVerified:req.body.lastTimeVerified,
            otype:otype
        });

        //return post object to database
        const post=await newPost.save();
        //return post in JSON format
        res.json(post);


    } catch (error) {
        //return error message
        console.error(error.message);
        res.status(500).send('server error')
    }



});    

//@router POST api/posts/medicineAssist
//@desc post a medicine request 
//@access private
router.post('/medicineAssist',auth,async(req,res)=>{
    try {
        //setting the type of post
       const otype="medicine";
       //find the details of the user specific to the post
        const user=await User.findById(req.user.id);
        
        //create an object from Post and populate it with details from the request object
        const newPost=new Post({
            user:req.user.id,
            userName:req.body.userName,
            address:req.body.address,
            typeOfMedicine:req.body.typeOfMedicine,
            quantity:req.body.quantity,
            price:req.body.price,
            phone:req.body.phone,
            docrequired:req.body.docrequired,
            lastTimeVerified:req.body.lastTimeVerified,
            otype:otype
        });

        //return post object to database
        const post=await newPost.save();
        //return the object in  the form of JSON
        res.json(post);


    } catch (error) {
        //return error message
        console.error(error.message);98
        res.status(500).send('server error')
    }



});   


// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete('/oxygen/:id',auth, async (req, res) => {
    try {
        //find the details of the post
      const post = await Post.findById(req.params.id);
        //check if post exists or not
      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
  
      // Check if logged in user and post user are same
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
      //delete post
      await post.remove();
      //return message
      res.json({ msg: 'Post removed' });
    } catch (err) {
        //return error message
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  



// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete('/medicine/:id',auth, async (req, res) => {
    try {
        //find the details of the post to be deleted from the db
      const post = await Post.findById(req.params.id);
  
        //if post does not exist display the message
      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
  
      // Check if post user and logged in user are same
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
      //delete the post
      await post.remove();
      //return the deleted message
      res.json({ msg: 'Post removed' });
    } catch (err) {
        //return if any error occurs
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  });
  

  //export the module 
module.exports=router;


  


